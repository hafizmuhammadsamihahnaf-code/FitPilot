import React, { useEffect } from 'react';
import { 
  Bell, 
  Play, 
  X, 
  Clock, 
  Dumbbell, 
  Volume2, 
  VolumeX, 
  Timer,
  AlertTriangle
} from 'lucide-react';
import { WorkoutAlarm, WorkoutRoutine } from '../types';
import { soundEngine } from '../services/audio';

interface AlarmModalProps {
  alarm: WorkoutAlarm | null;
  routine: WorkoutRoutine | null;
  isOpen: boolean;
  onClose: () => void;
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onSnooze: () => void;
}

export const AlarmModal: React.FC<AlarmModalProps> = ({
  alarm,
  routine,
  isOpen,
  onClose,
  onStartRoutine,
  onSnooze
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playAlarmChime(3);
    } else {
      soundEngine.stopAlarm();
    }

    return () => {
      soundEngine.stopAlarm();
    };
  }, [isOpen]);

  if (!isOpen || !alarm) return null;

  const isMorning = alarm.id === 'morning';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-md animate-fadeIn">
      {/* Ambient background blur glow */}
      <div 
        className={`absolute w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none ${
          isMorning ? 'bg-amber-400' : 'bg-blue-500'
        }`}
      />

      <div className="relative max-w-lg w-full rounded-3xl bg-[#0d1b33]/95 border border-blue-400/30 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.7)] text-white space-y-6 font-comic">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-600/25 text-blue-200 border border-blue-400/40 animate-bounce">
              <Bell size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                {isMorning 
                  ? `🌅 Morning Alarm (${alarm.time || '05:00'})` 
                  : `🌆 Evening Alarm (${alarm.time || '18:00'})`}
              </span>
              <h2 className="text-xl font-bold text-white">
                {alarm.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.stopAlarm();
              onClose();
            }}
            className="p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 hover:text-white transition-colors border border-blue-400/20"
            title="Silence & Turn Off Alarm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Alarm Message & Description */}
        <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 space-y-3">
          <p className="text-xs text-blue-100/90 leading-relaxed">
            {isMorning
              ? "Time for your 05:00 AM Morning Routine! Awaken your body, mobilize your spine, and kickstart your daily metabolism."
              : "Evening workout time! Relieve desk fatigue, decompress your lower back, and reset your posture."
            }
          </p>

          {routine && (
            <div className="pt-2 border-t border-blue-400/20 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <span className="flex items-center gap-1.5 bg-blue-900/40 px-3 py-1 rounded-xl border border-blue-400/20">
                <Dumbbell size={13} className="text-blue-400" />
                <span className="font-semibold text-white">{routine.title}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-blue-900/40 px-3 py-1 rounded-xl border border-blue-400/20">
                <Clock size={13} className="text-amber-400" />
                <span>~{routine.estimatedMinutes} mins</span>
              </span>
              <span className="flex items-center gap-1.5 bg-blue-900/40 px-3 py-1 rounded-xl border border-blue-400/20">
                <Timer size={13} className="text-blue-300" />
                <span>{routine.exercises.length} Exercises</span>
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {routine && (
            <button
              onClick={() => {
                soundEngine.stopAlarm();
                onStartRoutine(routine);
                onClose();
              }}
              className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30 shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              <Play size={16} fill="currentColor" />
              <span>Start Workout Routine Now</span>
            </button>
          )}

          <div className="flex gap-2.5">
            <button
              onClick={() => {
                soundEngine.stopAlarm();
                onSnooze();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-xs font-semibold text-blue-200 flex items-center justify-center gap-1.5 transition-colors border border-blue-400/20"
            >
              <Clock size={14} />
              <span>Snooze 10 Minutes</span>
            </button>

            <button
              onClick={() => {
                soundEngine.stopAlarm();
                onClose();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-blue-950/40 hover:bg-rose-950/40 text-xs font-medium text-blue-300 hover:text-rose-200 transition-colors border border-blue-400/20 hover:border-rose-500/30 flex items-center justify-center gap-1.5"
            >
              <VolumeX size={14} />
              <span>Silence &amp; Turn Off</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
