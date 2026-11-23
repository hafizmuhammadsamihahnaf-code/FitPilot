import React, { useState } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  Volume2, 
  Clock, 
  Play, 
  Timer,
  Lock
} from 'lucide-react';
import { WorkoutAlarmSettings, WorkoutRoutine } from '../types';
import { soundEngine } from '../services/audio';

interface ScheduleAlarmManagerProps {
  alarms: WorkoutAlarmSettings;
  routines: WorkoutRoutine[];
  onUpdateAlarms: (newAlarms: WorkoutAlarmSettings) => void;
  onStartRoutine: (routine: WorkoutRoutine) => void;
}

export const ScheduleAlarmManager: React.FC<ScheduleAlarmManagerProps> = ({
  alarms,
  routines,
  onUpdateAlarms,
  onStartRoutine
}) => {
  const [testingAlarm, setTestingAlarm] = useState(false);

  const handleTimeChange = (alarmId: 'morning' | 'evening', newTime: string) => {
    const updated = {
      ...alarms,
      [alarmId]: {
        ...alarms[alarmId],
        time: newTime,
        enabled: true
      }
    };
    onUpdateAlarms(updated);
  };

  const handleTestSound = () => {
    setTestingAlarm(true);
    soundEngine.playAlarmChime(2);
    setTimeout(() => {
      setTestingAlarm(false);
    }, 3200);
  };

  const morningRoutine = routines.find(r => r.id === alarms.morning.routineId) || routines[0];
  const eveningRoutine = routines.find(r => r.id === alarms.evening.routineId) || routines[3] || routines[0];

  return (
    <div className="rounded-3xl ios-glass border border-blue-400/20 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-5 font-comic">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-400/15 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              Mandatory Habit Schedule
            </span>
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Daily Morning &amp; Evening Workout Alarms</span>
          </h3>
          <p className="text-xs text-blue-200/80">
            Automated alerts that cannot be disabled beforehand. Rings every day and can be silenced manually when active.
          </p>
        </div>

        {/* Test Alarm Sound */}
        <button
          onClick={handleTestSound}
          disabled={testingAlarm}
          className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-400/20 self-start sm:self-auto shrink-0"
        >
          <Volume2 size={14} className={testingAlarm ? 'text-amber-400 animate-spin' : 'text-blue-400'} />
          <span>{testingAlarm ? 'Ringing...' : 'Test Alarm Sound'}</span>
        </button>
      </div>

      {/* Grid: Morning Card & Evening Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Morning Session Card */}
        <div className="p-5 rounded-3xl border border-blue-400/25 bg-[#0b1736]/80 backdrop-blur-2xl shadow-[0_4px_24px_rgba(2,6,23,0.5)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-200">
                <Sun size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 block">
                  05:00 AM • Morning Awakening
                </span>
                <span className="font-bold text-white text-sm">
                  {alarms.morning.title}
                </span>
              </div>
            </div>

            {/* Permanent status pill */}
            <div 
              title="Permanent Habit: Rings every morning at 05:00 AM."
              className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 font-bold text-[10px] flex items-center gap-1 shadow-sm"
            >
              <Lock size={10} />
              <span>Active</span>
            </div>
          </div>

          <p className="text-xs text-blue-200/80 leading-relaxed">
            {alarms.morning.description}
          </p>

          {/* Time & Interval Details */}
          <div className="grid grid-cols-2 gap-2 bg-blue-950/60 p-3 rounded-2xl border border-blue-400/15 text-xs">
            <div>
              <span className="text-[10px] text-blue-300/70 block mb-1 font-medium">Scheduled Time</span>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-blue-400" />
                <input
                  type="time"
                  value={alarms.morning.time}
                  onChange={(e) => handleTimeChange('morning', e.target.value)}
                  className="bg-blue-900/60 text-white text-xs font-bold rounded-lg px-2 py-0.5 border border-blue-400/20 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-blue-300/70 block mb-1 font-medium">Work / Rest Interval</span>
              <span className="text-blue-100 font-semibold">
                {alarms.morning.defaultWorkSeconds}s Work / {alarms.morning.defaultRestSeconds}s Rest
              </span>
            </div>
          </div>

          {/* Quick routine info & start */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] text-blue-300/80 flex items-center gap-1.5">
              <Timer size={13} className="text-blue-400" />
              <span>{morningRoutine.exercises.length} Exercises (~{morningRoutine.estimatedMinutes} mins)</span>
            </div>

            <button
              onClick={() => onStartRoutine(morningRoutine)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-white font-bold text-xs flex items-center gap-1.5 border border-blue-400/30 transition-all active:scale-95 shadow-sm"
            >
              <Play size={12} fill="currentColor" />
              <span>Start Routine</span>
            </button>
          </div>
        </div>

        {/* Evening Session Card */}
        <div className="p-5 rounded-3xl border border-blue-400/25 bg-[#0b1736]/80 backdrop-blur-2xl shadow-[0_4px_24px_rgba(2,6,23,0.5)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-200">
                <Moon size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 block">
                  {alarms.evening.time ? `${alarms.evening.time} • Evening Reset` : '06:00 PM • Evening Reset'}
                </span>
                <span className="font-bold text-white text-sm">
                  {alarms.evening.title}
                </span>
              </div>
            </div>

            {/* Permanent status pill */}
            <div 
              title="Permanent Habit: Rings in the evening."
              className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 font-bold text-[10px] flex items-center gap-1 shadow-sm"
            >
              <Lock size={10} />
              <span>Active</span>
            </div>
          </div>

          <p className="text-xs text-blue-200/80 leading-relaxed">
            {alarms.evening.description}
          </p>

          {/* Time & Interval Details with quick 6 PM / 7 PM pills */}
          <div className="space-y-2 bg-blue-950/60 p-3 rounded-2xl border border-blue-400/15 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-blue-300/70 block mb-1 font-medium">Scheduled Time</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-blue-400" />
                  <input
                    type="time"
                    value={alarms.evening.time}
                    onChange={(e) => handleTimeChange('evening', e.target.value)}
                    className="bg-blue-900/60 text-white text-xs font-bold rounded-lg px-2 py-0.5 border border-blue-400/20 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-blue-300/70 block mb-1 font-medium">Work / Rest Interval</span>
                <span className="text-blue-100 font-semibold">
                  {alarms.evening.defaultWorkSeconds}s Work / {alarms.evening.defaultRestSeconds}s Rest
                </span>
              </div>
            </div>

            {/* Quick Presets: 06:00 PM or 07:00 PM */}
            <div className="flex items-center gap-2 pt-1 border-t border-blue-400/10">
              <span className="text-[10px] text-blue-300/60">Quick Select:</span>
              <button
                type="button"
                onClick={() => handleTimeChange('evening', '18:00')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                  alarms.evening.time === '18:00'
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-blue-950/70 border-blue-400/20 text-blue-300 hover:text-white'
                }`}
              >
                06:00 PM (18:00)
              </button>
              <button
                type="button"
                onClick={() => handleTimeChange('evening', '19:00')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                  alarms.evening.time === '19:00'
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-blue-950/70 border-blue-400/20 text-blue-300 hover:text-white'
                }`}
              >
                07:00 PM (19:00)
              </button>
            </div>
          </div>

          {/* Quick routine info & start */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] text-blue-300/80 flex items-center gap-1.5">
              <Timer size={13} className="text-blue-400" />
              <span>{eveningRoutine.exercises.length} Exercises (~{eveningRoutine.estimatedMinutes} mins)</span>
            </div>

            <button
              onClick={() => onStartRoutine(eveningRoutine)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-white font-bold text-xs flex items-center gap-1.5 border border-blue-400/30 transition-all active:scale-95 shadow-sm"
            >
              <Play size={12} fill="currentColor" />
              <span>Start Routine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
