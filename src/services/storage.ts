import { UserProfile, WorkoutSessionLog, AppSettings, BodyMetric, WorkoutAlarmSettings } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'fitpilot_profile_v1',
  SESSIONS: 'fitpilot_sessions_v1',
  SETTINGS: 'fitpilot_settings_v1',
  METRICS: 'fitpilot_metrics_v1'
};

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  voiceCuesEnabled: true,
  soundVolume: 75,
  prepCountdownSeconds: 5,
  autoAdvanceExercises: true,
  accentColor: 'slate',
  alarms: {
    morning: {
      id: 'morning',
      title: 'Morning Energy & Mobility Alarm',
      bengaliTitle: 'সকাল ০৫:০০ টা - প্রভাতী ব্যায়াম ও গতিশীলতা',
      time: '05:00',
      enabled: true,
      routineId: 'routine_mon_morning',
      routineTitle: 'Morning Awakening & Mobility',
      targetExercisesCount: 7,
      defaultWorkSeconds: 50,
      defaultRestSeconds: 20,
      description: 'Wake up joints, stimulate circulation, and kickstart daily discipline at 05:00 AM.'
    },
    evening: {
      id: 'evening',
      title: 'Evening Posture & Core Reset Alarm',
      bengaliTitle: 'সন্ধ্যা ০৬:০০ টা - সান্ধ্যকালীন রিল্যাক্স ও কোর রিসেট',
      time: '18:00',
      enabled: true,
      routineId: 'routine_mon_evening',
      routineTitle: 'Evening Posture & Desk Reset',
      targetExercisesCount: 6,
      defaultWorkSeconds: 45,
      defaultRestSeconds: 20,
      description: 'Decompress lower back, relieve desk stiffness, and restore vitality at 06:00 PM.'
    },
    soundEnabled: true,
    alarmVolume: 85
  }
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Samih',
  age: 24,
  experienceLevel: 'beginner',
  dailyAvailableMinutes: 30,
  equipment: ['none', 'mat'],
  goals: ['Build consistency', 'Relieve desk posture stiffness', 'Full-body mobility'],
  preferredWorkoutDays: [1, 3, 5, 6], // Mon, Wed, Fri, Sat
  metrics: [],
  onboardingCompleted: true
};

export const SAMPLE_SESSIONS: WorkoutSessionLog[] = [];

export const SAMPLE_METRICS: BodyMetric[] = [];

export class StorageService {
  static getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading profile from storage', e);
    }
    this.saveProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }

  static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to storage', e);
    }
  }

  static getSessions(): WorkoutSessionLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Strictly exclude any fake/sample session logs so only genuine completed workouts are displayed
          const genuine = parsed.filter(s => !s.id?.startsWith('sample_sess_'));
          if (genuine.length !== parsed.length) {
            this.saveSessions(genuine);
          }
          return genuine;
        }
      }
    } catch (e) {
      console.error('Error reading sessions from storage', e);
    }
    return [];
  }

  static saveSessions(sessions: WorkoutSessionLog[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving sessions to storage', e);
    }
  }

  static addSession(session: WorkoutSessionLog): void {
    const sessions = this.getSessions();
    sessions.unshift(session);
    this.saveSessions(sessions);
  }

  static getDefaultAlarmSettings(): WorkoutAlarmSettings {
    return DEFAULT_SETTINGS.alarms!;
  }

  static getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        const parsed = JSON.parse(data);
        const morningTime = parsed.alarms?.morning?.time === '07:00' ? '05:00' : (parsed.alarms?.morning?.time || '05:00');
        const eveningTime = (parsed.alarms?.evening?.time === '19:00' || parsed.alarms?.evening?.time === '17:30' || !parsed.alarms?.evening?.time) ? '18:00' : parsed.alarms.evening.time;

        const merged: AppSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          alarms: {
            ...DEFAULT_SETTINGS.alarms,
            ...(parsed.alarms || {}),
            morning: {
              ...(DEFAULT_SETTINGS.alarms.morning),
              ...(parsed.alarms?.morning || {}),
              time: morningTime,
              enabled: true // Always active daily discipline
            },
            evening: {
              ...(DEFAULT_SETTINGS.alarms.evening),
              ...(parsed.alarms?.evening || {}),
              time: eveningTime,
              enabled: true // Always active daily discipline
            }
          }
        };
        this.saveSettings(merged);
        return merged;
      }
    } catch (e) {
      console.error('Error reading settings from storage', e);
    }
    this.saveSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }

  static saveSettings(settings: AppSettings): void {
    try {
      // Alarms are mandatory habits - always keep enabled: true
      const enforced: AppSettings = {
        ...settings,
        alarms: {
          ...settings.alarms,
          morning: {
            ...settings.alarms.morning,
            enabled: true
          },
          evening: {
            ...settings.alarms.evening,
            enabled: true
          }
        }
      };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(enforced));
    } catch (e) {
      console.error('Error saving settings to storage', e);
    }
  }

  static getMetrics(): BodyMetric[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.METRICS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed.filter(m => !m.id?.startsWith('m_1') && !m.id?.startsWith('m_2') && !m.id?.startsWith('m_3'));
        }
      }
    } catch (e) {
      console.error('Error reading metrics from storage', e);
    }
    return [];
  }

  static saveMetrics(metrics: BodyMetric[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
    } catch (e) {
      console.error('Error saving metrics to storage', e);
    }
  }

  static addMetric(metric: BodyMetric): void {
    const list = this.getMetrics();
    list.unshift(metric);
    this.saveMetrics(list);
  }

  static exportAllData(): string {
    const dump = {
      app: 'FitPilot',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      sessions: this.getSessions(),
      settings: this.getSettings(),
      metrics: this.getMetrics()
    };
    return JSON.stringify(dump, null, 2);
  }

  static importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (Array.isArray(parsed.sessions)) this.saveSessions(parsed.sessions);
      if (parsed.settings) this.saveSettings(parsed.settings);
      if (Array.isArray(parsed.metrics)) this.saveMetrics(parsed.metrics);
      return true;
    } catch (e) {
      console.error('Failed to import data', e);
      return false;
    }
  }

  static resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.METRICS);
  }
}
