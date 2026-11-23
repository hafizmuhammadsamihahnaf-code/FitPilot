import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Training } from './components/Training';
import { TimerHero } from './components/TimerHero';
import { ProgressView } from './components/ProgressView';
import { CalendarView } from './components/CalendarView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { ExerciseModal } from './components/ExerciseModal';
import { SafetyAlertModal } from './components/SafetyAlertModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { InstallAppModal } from './components/InstallAppModal';
import { AlarmModal } from './components/AlarmModal';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Timer as TimerNavIcon, 
  TrendingUp, 
  Calendar as CalendarNavIcon, 
  Settings as SettingsNavIcon,
  Download
} from 'lucide-react';

import { 
  ActiveTab, 
  UserProfile, 
  WorkoutSessionLog, 
  AppSettings, 
  BodyMetric, 
  WorkoutRoutine, 
  Exercise, 
  ActiveWorkoutState,
  WorkoutAlarm,
  WorkoutAlarmSettings
} from './types';
import { StorageService } from './services/storage';
import { WORKOUT_ROUTINES } from './data/workouts';
import { soundEngine } from './services/audio';

export default function App() {
  // Application Data States
  const [currentTab, setCurrentTab] = useState<ActiveTab>('overview');
  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [sessions, setSessions] = useState<WorkoutSessionLog[]>(StorageService.getSessions());
  const [settings, setSettings] = useState<AppSettings>(StorageService.getSettings());
  const [metrics, setMetrics] = useState<BodyMetric[]>(StorageService.getMetrics());

  // Active workout states
  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine | null>(null);
  const [activeWorkoutState, setActiveWorkoutState] = useState<ActiveWorkoutState | null>(null);

  // Modals
  const [selectedExerciseModal, setSelectedExerciseModal] = useState<Exercise | null>(null);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [triggeredAlarm, setTriggeredAlarm] = useState<WorkoutAlarm | null>(null);
  const [lastTriggeredSlot, setLastTriggeredSlot] = useState<{ morning?: string; evening?: string }>({});

  // Background Automatic Alarm Checker (Real-time Live Tick Monitor)
  useEffect(() => {
    const alarms = settings.alarms || StorageService.getDefaultAlarmSettings();
    const interval = setInterval(() => {
      const now = new Date();
      const currentHM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const todayDate = now.toISOString().split('T')[0];

      // Check Morning Alarm
      if (
        alarms.morning.enabled &&
        alarms.morning.time === currentHM &&
        lastTriggeredSlot.morning !== todayDate &&
        !triggeredAlarm
      ) {
        setTriggeredAlarm(alarms.morning);
        setLastTriggeredSlot(prev => ({ ...prev, morning: todayDate }));
      }
      // Check Evening Alarm
      else if (
        alarms.evening.enabled &&
        alarms.evening.time === currentHM &&
        lastTriggeredSlot.evening !== todayDate &&
        !triggeredAlarm
      ) {
        setTriggeredAlarm(alarms.evening);
        setLastTriggeredSlot(prev => ({ ...prev, evening: todayDate }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.alarms, lastTriggeredSlot, triggeredAlarm]);

  // Initialize audio settings
  useEffect(() => {
    soundEngine.setMuted(!settings.soundEnabled);
    soundEngine.setVolume(settings.soundVolume);
    soundEngine.setVoiceEnabled(settings.voiceCuesEnabled);
  }, []);

  const handleStartRoutine = (routine: WorkoutRoutine) => {
    setActiveRoutine(routine);
    setActiveWorkoutState(null); // fresh start
    setCurrentTab('timer');
  };

  const handleStartSingleExercise = (exercise: Exercise) => {
    const singleRoutine: WorkoutRoutine = {
      id: 'single_' + exercise.id,
      title: exercise.name,
      subtitle: exercise.purpose,
      category: exercise.category,
      difficulty: exercise.difficulty,
      timeOfDay: 'morning',
      estimatedMinutes: Math.ceil((exercise.durationSeconds || 45) / 60),
      description: exercise.purpose,
      exercises: [
        {
          exerciseId: exercise.id,
          workSeconds: exercise.durationSeconds || 45,
          restSeconds: exercise.restSeconds || 20,
          reps: exercise.reps
        }
      ]
    };
    setActiveRoutine(singleRoutine);
    setActiveWorkoutState(null);
    setCurrentTab('timer');
  };

  const handleFinishWorkout = (
    durationMinutes: number,
    exercisesCompleted: number,
    notes?: string,
    rating?: number
  ) => {
    if (!activeRoutine) return;
    const newLog: WorkoutSessionLog = {
      id: 'sess_' + Date.now(),
      routineId: activeRoutine.id,
      routineTitle: activeRoutine.title,
      timestamp: new Date().toISOString(),
      durationMinutes,
      exercisesCompleted,
      notes: notes?.trim() || undefined,
      rating
    };
    StorageService.addSession(newLog);
    setSessions(StorageService.getSessions());
    setActiveRoutine(null);
    setActiveWorkoutState(null);
    setCurrentTab('overview');
  };

  const handleExitWorkout = () => {
    if (confirm('Exit current workout session?')) {
      setActiveRoutine(null);
      setActiveWorkoutState(null);
      setCurrentTab('overview');
    }
  };

  const handleStopWorkoutFromSafety = () => {
    setActiveRoutine(null);
    setActiveWorkoutState(null);
    setCurrentTab('overview');
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    StorageService.saveProfile(newProfile);
    setProfile(newProfile);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleUpdateAlarms = (newAlarms: WorkoutAlarmSettings) => {
    const updated = { ...settings, alarms: newAlarms };
    handleUpdateSettings(updated);
  };

  const handleAddMetric = (newMetric: BodyMetric) => {
    StorageService.addMetric(newMetric);
    setMetrics(StorageService.getMetrics());
  };

  const handleReloadData = () => {
    setProfile(StorageService.getProfile());
    setSessions(StorageService.getSessions());
    setSettings(StorageService.getSettings());
    setMetrics(StorageService.getMetrics());
  };

  const handleToggleSoundFromTitlebar = () => {
    const next = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: next };
    handleUpdateSettings(updated);
    soundEngine.setMuted(!next);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#060f26] text-[#eef2f7] overflow-hidden select-none font-sans">
      {/* Main Container: Sidebar + Central Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar (Desktop) */}
        <div className="hidden md:flex shrink-0">
          <Sidebar
            currentTab={currentTab}
            onSelectTab={tab => {
              soundEngine.playTick(480, 0.03);
              setCurrentTab(tab);
            }}
            activeWorkout={activeWorkoutState}
            onResumeWorkout={() => setCurrentTab('timer')}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
        </div>

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 bg-[#060f26] relative scroll-smooth pb-20 md:pb-6">
          {currentTab === 'overview' && (
            <Overview
              profile={profile}
              sessions={sessions}
              alarms={settings.alarms || StorageService.getDefaultAlarmSettings()}
              onUpdateAlarms={handleUpdateAlarms}
              onStartRoutine={handleStartRoutine}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'training' && (
            <Training
              onStartRoutine={handleStartRoutine}
              onOpenExerciseDetails={ex => setSelectedExerciseModal(ex)}
              onStartSingleExercise={handleStartSingleExercise}
            />
          )}

          {currentTab === 'timer' && (
            activeRoutine ? (
              <TimerHero
                routine={activeRoutine}
                settings={settings}
                userLevel={profile.experienceLevel || 'beginner'}
                onUpdateUserLevel={(lvl) => {
                  const updated = { ...profile, experienceLevel: lvl };
                  setProfile(updated);
                  StorageService.saveProfile(updated);
                }}
                onFinishWorkout={handleFinishWorkout}
                onExitWorkout={handleExitWorkout}
                onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
                onOpenExerciseDetails={ex => setSelectedExerciseModal(ex)}
                activeWorkoutState={activeWorkoutState}
                onUpdateActiveState={setActiveWorkoutState}
              />
            ) : (
              <div className="max-w-md mx-auto py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#151b24] border border-[#252e39] text-[#8f9baa] mx-auto flex items-center justify-center">
                  ⏱️
                </div>
                <h2 className="text-xl font-bold text-[#eef2f7]">
                  No Active Session
                </h2>
                <p className="text-xs text-[#8f9baa]">
                  Select a workout from Training or launch today's foundation routine to begin your session.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleStartRoutine(WORKOUT_ROUTINES[0])}
                    className="px-4 py-2.5 rounded-xl bg-[#e9eef5] hover:bg-white text-[#10151c] font-bold text-xs shadow-sm"
                  >
                    Start Today's Foundation
                  </button>
                  <button
                    onClick={() => setCurrentTab('training')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a212c] hover:bg-[#253040] text-[#8f9baa] hover:text-[#eef2f7] text-xs font-semibold border border-[#273241]"
                  >
                    Browse Workouts
                  </button>
                </div>
              </div>
            )
          )}

          {currentTab === 'progress' && (
            <ProgressView
              sessions={sessions}
              metrics={metrics}
              onAddMetric={handleAddMetric}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarView
              sessions={sessions}
              profile={profile}
              onStartRoutine={handleStartRoutine}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView
              profile={profile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onDataReload={handleReloadData}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Android & Mobile screen sizes) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 ios-glass border-t border-blue-400/20 flex items-center justify-around px-2 z-40 backdrop-blur-2xl font-comic">
        <button
          onClick={() => {
            soundEngine.playTick(480, 0.02);
            setCurrentTab('overview');
          }}
          className={`flex flex-col items-center justify-center w-12 py-1 transition-all ${
            currentTab === 'overview' ? 'text-white scale-105' : 'text-blue-300/70 hover:text-white'
          }`}
        >
          <LayoutDashboard size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playTick(480, 0.02);
            setCurrentTab('training');
          }}
          className={`flex flex-col items-center justify-center w-12 py-1 transition-all ${
            currentTab === 'training' ? 'text-white scale-105' : 'text-blue-300/70 hover:text-white'
          }`}
        >
          <Dumbbell size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Workouts</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playTick(480, 0.02);
            setCurrentTab('timer');
          }}
          className={`flex flex-col items-center justify-center w-12 py-1 relative transition-all ${
            currentTab === 'timer' ? 'text-white scale-105' : 'text-blue-300/70 hover:text-white'
          }`}
        >
          <div className="relative">
            <TimerNavIcon size={20} />
            {activeWorkoutState && (
              <span className="w-2 h-2 rounded-full bg-blue-400 absolute -top-0.5 -right-1 animate-ping"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold">Timer</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playTick(480, 0.02);
            setCurrentTab('progress');
          }}
          className={`flex flex-col items-center justify-center w-12 py-1 transition-all ${
            currentTab === 'progress' ? 'text-white scale-105' : 'text-blue-300/70 hover:text-white'
          }`}
        >
          <TrendingUp size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Stats</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playTick(480, 0.02);
            setCurrentTab('calendar');
          }}
          className={`flex flex-col items-center justify-center w-12 py-1 transition-all ${
            currentTab === 'calendar' ? 'text-white scale-105' : 'text-blue-300/70 hover:text-white'
          }`}
        >
          <CalendarNavIcon size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Calendar</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playTick(480, 0.02);
            setCurrentTab('settings');
          }}
          className={`flex flex-col items-center justify-center w-12 py-1 transition-all ${
            currentTab === 'settings' ? 'text-white scale-105' : 'text-blue-300/70 hover:text-white'
          }`}
        >
          <SettingsNavIcon size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Settings</span>
        </button>
      </nav>

      {/* Global Modals */}
      <ExerciseModal
        exercise={selectedExerciseModal}
        onClose={() => setSelectedExerciseModal(null)}
        onStartExercise={ex => {
          setSelectedExerciseModal(null);
          handleStartSingleExercise(ex);
        }}
      />

      <SafetyAlertModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        onStopWorkout={activeRoutine ? handleStopWorkoutFromSafety : undefined}
      />

      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Automatic Workout Alarm Alert Notification Modal */}
      <AlarmModal
        isOpen={Boolean(triggeredAlarm)}
        alarm={triggeredAlarm}
        routine={
          triggeredAlarm
            ? (WORKOUT_ROUTINES.find(r => r.id === triggeredAlarm.routineId) || WORKOUT_ROUTINES[0])
            : null
        }
        onClose={() => setTriggeredAlarm(null)}
        onStartRoutine={(routine: WorkoutRoutine) => {
          setTriggeredAlarm(null);
          handleStartRoutine(routine);
        }}
        onSnooze={() => {
          const alarmToSnooze = triggeredAlarm;
          setTriggeredAlarm(null);
          setTimeout(() => {
            if (alarmToSnooze) {
              setTriggeredAlarm(alarmToSnooze);
            }
          }, 10 * 60 * 1000);
        }}
      />
    </div>
  );
}
