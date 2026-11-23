import React from 'react';
import { 
  Play, 
  Flame, 
  Sparkles, 
  Moon, 
  Sun,
  Sunset,
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  HeartPulse,
  Award,
  Bell,
  Timer,
  Zap,
  Lock
} from 'lucide-react';
import { UserProfile, WorkoutSessionLog, WorkoutRoutine, WorkoutAlarmSettings } from '../types';
import { WORKOUT_ROUTINES } from '../data/workouts';
import { useLiveClock } from '../hooks/useLiveClock';
import { ScheduleAlarmManager } from './ScheduleAlarmManager';

interface OverviewProps {
  profile: UserProfile;
  sessions: WorkoutSessionLog[];
  alarms: WorkoutAlarmSettings;
  onUpdateAlarms: (alarms: WorkoutAlarmSettings) => void;
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onNavigateTab: (tab: 'training' | 'timer' | 'progress' | 'profile') => void;
}

export const Overview: React.FC<OverviewProps> = ({
  profile,
  sessions,
  alarms,
  onUpdateAlarms,
  onStartRoutine,
  onNavigateTab
}) => {
  const { 
    timeString12, 
    dateString, 
    period, 
    isMorning, 
    greetingEnglish,
    subtextEnglish 
  } = useLiveClock();

  // Accurate real-time streak calculation based strictly on actual user session dates
  const getLocalDateStr = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const todayStr = getLocalDateStr(today);
  const yesterdayStr = getLocalDateStr(new Date(Date.now() - 86400000));

  const daysSet = new Set(
    (sessions || []).map(s => getLocalDateStr(new Date(s.timestamp)))
  );

  const hasWorkedOutToday = daysSet.has(todayStr);
  const hasWorkedOutYesterday = daysSet.has(yesterdayStr);

  const calculateStreak = (): number => {
    if (!sessions || sessions.length === 0) return 0;
    
    // If user has not worked out today AND not worked out yesterday, streak is reset
    if (!hasWorkedOutToday && !hasWorkedOutYesterday) {
      return 0;
    }

    let streak = 0;
    const currentCheckDate = hasWorkedOutToday ? new Date() : new Date(Date.now() - 86400000);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(currentCheckDate.getTime() - i * 86400000);
      const str = getLocalDateStr(checkDate);
      if (daysSet.has(str)) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const streakDays = calculateStreak();
  const punishmentRoutine = WORKOUT_ROUTINES.find(r => r.isPunishment || r.id === 'routine_punishment');

  // Calculate missed days debt
  let missedDaysDebt = 0;
  if (!hasWorkedOutToday) {
    missedDaysDebt = 1;
    if (!hasWorkedOutYesterday && (sessions || []).length > 0) {
      missedDaysDebt = 2; // Compounded punishment
    }
  }

  // Weekly completion: check past 7 days
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isCompleted = sessions.some(
      s => new Date(s.timestamp).toISOString().split('T')[0] === dateStr
    );
    return { dayName, isCompleted, isToday: i === 6 };
  });

  const weeklyCompletedCount = past7Days.filter(d => d.isCompleted).length;
  const weeklyPercent = Math.round((weeklyCompletedCount / 4) * 100);

  // Day of week name to match current daily split
  const currentDayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const todaysRoutines = WORKOUT_ROUTINES.filter(r => r.recommendedDays?.includes(currentDayName));

  const morningRoutine = todaysRoutines.find(r => r.timeOfDay === 'morning') || 
    WORKOUT_ROUTINES.find(r => r.timeOfDay === 'morning') || WORKOUT_ROUTINES[0];

  const eveningRoutine = todaysRoutines.find(r => r.timeOfDay === 'evening') || 
    WORKOUT_ROUTINES.find(r => r.timeOfDay === 'evening') || WORKOUT_ROUTINES[1];

  const getTimeIcon = () => {
    switch (period) {
      case 'morning':
        return <Sun size={22} className="text-amber-400" />;
      case 'afternoon':
        return <Sun size={22} className="text-amber-300" />;
      case 'evening':
        return <Sunset size={22} className="text-orange-400" />;
      case 'night':
        return <Moon size={22} className="text-indigo-400" />;
    }
  };

  return (
    <div id="overview-view" className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Live Running Time & Dynamic Context-Aware Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl ios-glass border border-blue-400/25 p-6 sm:p-7 shadow-[0_12px_40px_-10px_rgba(2,6,23,0.7)]">
        {/* Subtle Ambient Radial Glow */}
        <div className={`absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isMorning ? 'bg-amber-400' : 'bg-blue-500'
        }`} />
        <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full blur-3xl opacity-15 bg-blue-600 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-400/25 text-white shadow-sm font-comic">
                {getTimeIcon()}
                <span>{greetingEnglish}</span>
              </span>
              <span className="text-blue-900">•</span>
              <span className="text-emerald-400 font-comic flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Active Tracker
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f0f6fc] font-comic tracking-tight">
              {greetingEnglish}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">{profile.name || 'Champion'}</span>!
            </h1>

            <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl leading-relaxed font-comic">
              {subtextEnglish}
            </p>
          </div>

          {/* Live Digital Clock & Calendar Widget */}
          <div className="flex flex-col sm:items-end justify-center shrink-0">
            <div className="p-3.5 sm:px-5 sm:py-3 rounded-2xl bg-blue-950/70 border border-blue-400/25 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-left sm:text-right">
              <div className="flex items-center sm:justify-end gap-2 text-blue-300/80 text-xs font-medium mb-1 font-comic">
                <Clock size={13} className="text-blue-400" />
                <span>Live System Time</span>
              </div>
              <div className="font-comic text-2xl sm:text-3xl font-bold text-white tracking-wider flex items-center sm:justify-end">
                {timeString12}
              </div>
              <div className="text-xs text-blue-200/70 mt-0.5 font-comic font-medium">
                {dateString}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MISSED WORKOUT / DISCIPLINE PUNISHMENT CARD */}
      {!hasWorkedOutToday ? (
        <div className="relative overflow-hidden rounded-3xl ios-glass border border-rose-500/35 p-6 shadow-[0_10px_35px_-5px_rgba(244,63,94,0.25)]">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-comic bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 shadow-sm">
                  <Flame size={14} className="text-rose-400 animate-pulse fill-rose-400" />
                  DISCIPLINE PENALTY • {missedDaysDebt > 1 ? 'COMPOUNDED DEBT (2x)' : 'MISSED WORKOUT DEBT'}
                </span>
                <span className="text-xs text-rose-300/80 font-comic font-medium">
                  No workout recorded yet for today!
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-comic text-white tracking-tight">
                Skipped your exercise? <span className="text-rose-400">Face the Discipline Penalty!</span>
              </h3>

              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-comic">
                Your body accepts no excuses. Clear your workout debt and eliminate sluggishness with this 20-minute metabolic inferno (Jumping Jacks, Wall Sits, High Knees, Pushups, Burpees, and Core Burn).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              {punishmentRoutine && (
                <button
                  onClick={() => onStartRoutine(punishmentRoutine)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold font-comic text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all"
                >
                  <Flame size={16} className="text-yellow-200 fill-yellow-200" />
                  <span>Execute Penalty Session</span>
                </button>
              )}

              <button
                onClick={() => onStartRoutine(isMorning ? morningRoutine : eveningRoutine)}
                className="px-4 py-3 rounded-2xl bg-blue-950/70 hover:bg-blue-900/70 border border-blue-400/30 text-blue-200 font-medium font-comic text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Today's {isMorning ? 'Morning' : 'Evening'} Split</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl ios-glass border border-emerald-500/30 p-5 flex items-center justify-between shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="font-comic font-bold text-base text-emerald-300">
                Outstanding! Today's workout session is completed
              </div>
              <div className="text-xs text-blue-200/80 font-comic">
                Zero skipped sessions. Your discipline and consistency are building real long-term longevity!
              </div>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-comic font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Goal Completed ✓
          </span>
        </div>
      )}

      {/* DUAL TRAINING SYSTEM: Morning vs. Evening Split for Today */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-white font-comic flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              <span>Today's Dual Split: {currentDayName}</span>
            </h2>
            <p className="text-xs text-blue-200/70 font-comic">
              Specialized morning activation and evening posture decompression routine
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('training')}
            className="text-xs text-blue-400 hover:text-blue-300 font-comic font-bold flex items-center gap-1"
          >
            <span>Explore All 14 Routines</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* MORNING SESSION CARD */}
          <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
            isMorning
              ? 'bg-[#0b1836]/90 border-blue-400/40 shadow-[0_8px_32px_rgba(2,6,23,0.6)] ring-1 ring-blue-400/20'
              : 'ios-glass-card'
          }`}>
            {isMorning && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/30 text-blue-200 border border-blue-400/40 flex items-center gap-1 animate-pulse font-comic">
                  <Sun size={11} />
                  Optimal Right Now
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-200 shadow-inner">
                  <Sun size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 font-comic block">
                    Morning Routine (05:00 AM)
                  </span>
                  <h3 className="text-lg font-bold text-white font-comic">
                    {morningRoutine.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-blue-200/80 leading-relaxed font-comic">
                {morningRoutine.subtitle}. Essential morning movement to lubricate joints and awaken neural drive.
              </p>

              {/* Intervals preview */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-blue-200">
                <span className="flex items-center gap-1 bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-400/20 font-comic">
                  <Clock size={12} className="text-blue-400" />
                  ~{morningRoutine.estimatedMinutes} min
                </span>
                <span className="flex items-center gap-1 bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-400/20 font-comic">
                  <Timer size={12} className="text-blue-400" />
                  {morningRoutine.exercises.length} Exercises
                </span>
                <span className="flex items-center gap-1 bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-400/20 font-comic">
                  <Lock size={11} className="text-blue-400" />
                  Alarm: {alarms.morning.time || '05:00'} (Mandatory)
                </span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-blue-400/15 flex items-center justify-between">
              <span className="text-[11px] text-blue-300/80 font-comic">
                50s Work / 20s Rest
              </span>

              <button
                onClick={() => onStartRoutine(morningRoutine)}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-comic text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all border border-blue-400/30"
              >
                <Play size={13} fill="currentColor" />
                <span>Start Morning Session</span>
              </button>
            </div>
          </div>

          {/* EVENING SESSION CARD */}
          <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
            !isMorning
              ? 'bg-[#0b1836]/90 border-blue-400/40 shadow-[0_8px_32px_rgba(2,6,23,0.6)] ring-1 ring-blue-400/20'
              : 'ios-glass-card'
          }`}>
            {!isMorning && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/30 text-blue-200 border border-blue-400/40 flex items-center gap-1 animate-pulse font-comic">
                  <Moon size={11} />
                  Optimal Right Now
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-200 shadow-inner">
                  <Sunset size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 font-comic block">
                    Evening Routine ({alarms.evening.time === '18:00' ? '06:00 PM' : (alarms.evening.time || '06:00 PM')})
                  </span>
                  <h3 className="text-lg font-bold text-white font-comic">
                    {eveningRoutine.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-blue-200/80 leading-relaxed font-comic">
                {eveningRoutine.subtitle}. Reverse sitting fatigue and realign posture for restorative sleep.
              </p>

              {/* Intervals preview */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-blue-200">
                <span className="flex items-center gap-1 bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-400/20 font-comic">
                  <Clock size={12} className="text-blue-400" />
                  ~{eveningRoutine.estimatedMinutes} min
                </span>
                <span className="flex items-center gap-1 bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-400/20 font-comic">
                  <Timer size={12} className="text-blue-400" />
                  {eveningRoutine.exercises.length} Exercises
                </span>
                <span className="flex items-center gap-1 bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-400/20 font-comic">
                  <Lock size={11} className="text-blue-400" />
                  Alarm: {alarms.evening.time || '18:00'} (Mandatory)
                </span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-blue-400/15 flex items-center justify-between">
              <span className="text-[11px] text-blue-300/80 font-comic">
                45s Work / 20s Rest
              </span>

              <button
                onClick={() => onStartRoutine(eveningRoutine)}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-comic text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all border border-blue-400/30"
              >
                <Play size={13} fill="currentColor" />
                <span>Start Evening Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SCHEDULE & AUTOMATIC ALARM MANAGER WIDGET */}
      <ScheduleAlarmManager
        alarms={alarms}
        routines={WORKOUT_ROUTINES}
        onUpdateAlarms={onUpdateAlarms}
        onStartRoutine={onStartRoutine}
      />

      {/* 4-Card Status Grid with Frosted Glass Aesthetics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak card */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-blue-300/80 text-xs mb-2">
              <span className="font-comic font-semibold uppercase tracking-wider">Consistency Streak</span>
              <Flame size={16} className={streakDays > 0 ? 'text-amber-400 animate-pulse' : 'text-blue-500/50'} />
            </div>
            <div className="text-3xl font-bold text-white font-comic">
              {streakDays} <span className="text-base font-comic font-normal text-blue-300">Days</span>
            </div>
            <p className="text-xs text-blue-200/70 mt-1 font-comic">
              {streakDays > 0 ? 'Unstoppable! Solid momentum.' : 'Execute today to begin your streak!'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-blue-400/15">
            {past7Days.map((d, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-comic text-blue-300/60">{d.dayName}</span>
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-comic ${
                    d.isCompleted
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : d.isToday
                      ? 'border border-dashed border-blue-400 bg-blue-950/60 text-blue-300'
                      : 'bg-blue-950/40 text-blue-700'
                  }`}
                >
                  {d.isCompleted && '✓'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Target Card */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-blue-300/80 text-xs mb-2">
              <span className="font-comic font-semibold uppercase tracking-wider">Weekly Target</span>
              <CheckCircle2 size={16} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white font-comic">
              {weeklyCompletedCount} / 4 <span className="text-base font-comic font-normal text-blue-300">Sessions</span>
            </div>
            <p className="text-xs text-blue-200/70 mt-1 font-comic">
              3–4 sessions per week preserve joint mobility and functional core strength.
            </p>
          </div>

          <div className="pt-3">
            <div className="w-full bg-blue-950/80 rounded-full h-2 overflow-hidden border border-blue-400/20">
              <div
                className="bg-gradient-to-r from-blue-500 to-sky-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ width: `${Math.min(100, weeklyPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Focus Pillar */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-blue-300/80 text-xs mb-2">
              <span className="font-comic font-semibold uppercase tracking-wider">Primary Focus</span>
              <HeartPulse size={16} className="text-rose-400" />
            </div>
            <div className="text-lg font-bold text-white font-comic">
              Mobility & Posture
            </div>
            <p className="text-xs text-blue-200/70 mt-1 leading-relaxed font-comic">
              Balanced daily routines decompress neck, shoulders, and lower lumbar strain.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('training')}
            className="text-xs text-blue-300 hover:text-white flex items-center gap-1 font-comic font-bold pt-3 mt-1"
          >
            <span>Browse All Routines</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Recovery Reminder */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-blue-300/80 text-xs mb-2">
              <span className="font-comic font-semibold uppercase tracking-wider">Recovery & Hydration</span>
              <Moon size={16} className="text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-white font-comic">
              Deep Sleep & Water
            </div>
            <p className="text-xs text-blue-200/70 mt-1 leading-relaxed font-comic">
              Hydrate throughout the day and target 7–8 hours of restorative sleep each night.
            </p>
          </div>

          <div className="pt-2 text-[11px] text-blue-300/70 flex items-center gap-1 font-comic">
            <span>Rest is when physical adaptation occurs.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
