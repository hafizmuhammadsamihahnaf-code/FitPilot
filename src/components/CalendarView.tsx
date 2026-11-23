import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  Dumbbell, 
  Sparkles,
  Award
} from 'lucide-react';
import { WorkoutSessionLog, UserProfile, WorkoutRoutine } from '../types';
import { WORKOUT_ROUTINES } from '../data/workouts';

interface CalendarViewProps {
  sessions: WorkoutSessionLog[];
  profile: UserProfile;
  onStartRoutine: (routine: WorkoutRoutine) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  sessions,
  profile,
  onStartRoutine
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayStr, setSelectedDayStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const selectedDateSessions = sessions.filter(
    s => new Date(s.timestamp).toISOString().split('T')[0] === selectedDayStr
  );

  const isDayPreferred = (dayOfWeek: number) => {
    return profile.preferredWorkoutDays.includes(dayOfWeek);
  };

  return (
    <div id="calendar-view" className="max-w-5xl mx-auto space-y-6 pb-12 font-comic">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Training Calendar &amp; Consistency
          </h1>
          <p className="text-sm text-blue-200/80 mt-1">
            Track daily discipline across the month. Green markers indicate successfully completed workouts.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2 ios-glass border border-blue-400/20 rounded-2xl p-1.5 self-start sm:self-auto shadow-md">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-xl hover:bg-blue-900/60 text-blue-200 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-bold text-white px-3">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-xl hover:bg-blue-900/60 text-blue-200 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Grid */}
        <div className="lg:col-span-2 ios-glass-card rounded-3xl p-5 shadow-lg">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-blue-300/70 pb-3 border-b border-blue-400/15">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-3">
            {/* Empty slots for previous month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-2xl bg-blue-950/20 opacity-20" />
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateObj = new Date(year, month, dayNum);
              const dateStr = dateObj.toISOString().split('T')[0];
              const dayOfWeek = dateObj.getDay();

              const daySessions = sessions.filter(
                s => new Date(s.timestamp).toISOString().split('T')[0] === dateStr
              );
              const isCompleted = daySessions.length > 0;
              const isSelected = selectedDayStr === dateStr;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;
              const isTargetDay = isDayPreferred(dayOfWeek);

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDayStr(dateStr)}
                  className={`h-16 sm:h-20 p-2 rounded-2xl border flex flex-col justify-between text-left transition-all relative ${
                    isSelected
                      ? 'border-blue-400 bg-blue-600/40 shadow-md scale-102'
                      : isCompleted
                      ? 'border-emerald-400/40 bg-emerald-950/40 hover:bg-emerald-900/40'
                      : isToday
                      ? 'border-blue-400/50 bg-blue-950/70 hover:bg-blue-900/50'
                      : 'border-blue-400/10 bg-blue-950/30 hover:bg-blue-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? 'text-blue-300'
                          : isCompleted
                          ? 'text-emerald-300'
                          : 'text-blue-200/70'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {isCompleted && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    )}
                  </div>

                  <div className="text-[10px]">
                    {isCompleted ? (
                      <span className="text-emerald-300 font-bold truncate block">
                        ✓ {daySessions[0].durationMinutes}m
                      </span>
                    ) : isTargetDay ? (
                      <span className="text-blue-400/60 block">Planned</span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-4 mt-3 border-t border-blue-400/15 text-xs text-blue-300/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Completed workout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-dashed border-blue-400/50" />
              <span>Scheduled day</span>
            </div>
          </div>
        </div>

        {/* Selected Day Inspector */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-400/15">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-blue-300/70 block font-bold">
                  Selected Date
                </span>
                <h3 className="text-lg font-bold text-white">
                  {new Date(selectedDayStr + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
              </div>
            </div>

            {selectedDateSessions.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Completed Sessions
                </span>
                {selectedDateSessions.map(s => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-400/20 space-y-1.5 text-xs"
                  >
                    <div className="font-bold text-white text-sm">
                      {s.routineTitle}
                    </div>
                    <div className="flex items-center gap-2 text-blue-200/80">
                      <Clock size={12} className="text-blue-400" />
                      <span>{s.durationMinutes} minutes duration</span>
                    </div>
                    {s.notes && (
                      <p className="text-[11px] text-blue-200/70 italic pt-1">
                        &quot;{s.notes}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-950/60 text-blue-400 mx-auto flex items-center justify-center border border-blue-400/20">
                  <CalendarIcon size={18} />
                </div>
                <p className="text-xs text-blue-200/80">
                  No workout recorded on this date.
                </p>
                <p className="text-[11px] text-blue-300/60">
                  Ready to train? You can launch a routine directly right here.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-blue-400/15">
            <button
              onClick={() => onStartRoutine(WORKOUT_ROUTINES[0])}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Dumbbell size={14} />
              <span>Launch Routine for this Day</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
