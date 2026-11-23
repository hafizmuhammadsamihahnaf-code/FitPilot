import React, { useState } from 'react';
import { 
  Dumbbell, 
  Play, 
  Clock, 
  Info, 
  Search, 
  Flame, 
  Sun, 
  Sunset, 
  Calendar,
  Layers,
  Timer,
  CheckCircle2
} from 'lucide-react';
import { Exercise, WorkoutRoutine } from '../types';
import { WORKOUT_ROUTINES } from '../data/workouts';
import { EXERCISES_LIBRARY } from '../data/exercises';
import { useLiveClock } from '../hooks/useLiveClock';

interface TrainingProps {
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onOpenExerciseDetails: (exercise: Exercise) => void;
  onStartSingleExercise: (exercise: Exercise) => void;
}

const DAYS_OF_WEEK = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const Training: React.FC<TrainingProps> = ({
  onStartRoutine,
  onOpenExerciseDetails,
  onStartSingleExercise
}) => {
  const { isMorning } = useLiveClock();
  const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'evening' | 'punishment'>('all');
  const [dayFilter, setDayFilter] = useState<string>('All Days');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'routines' | 'exercises'>('routines');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'full_body', label: 'Full Body' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'core', label: 'Core & Posture' },
    { id: 'lower_body', label: 'Lower Body' },
    { id: 'upper_body', label: 'Upper Body' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'recovery', label: 'Recovery' }
  ];

  // Filter routines by time of day, day of week, category, difficulty, search
  const filteredRoutines = WORKOUT_ROUTINES.filter(r => {
    if (timeFilter === 'punishment') {
      if (!r.isPunishment) return false;
    } else if (timeFilter !== 'all') {
      if (r.timeOfDay !== timeFilter && !r.isPunishment) return false;
    }

    if (dayFilter !== 'All Days') {
      if (r.isPunishment) {
        // punishment visible if specifically selected or on all days
      } else if (!r.recommendedDays?.includes(dayFilter)) {
        return false;
      }
    }

    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && r.difficulty !== selectedDifficulty) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter individual exercises
  const filteredExercises = EXERCISES_LIBRARY.filter(e => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && e.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.purpose.toLowerCase().includes(q) ||
        e.targetMuscles.some(m => m.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="training-view" className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-comic">
            Workout Routines & Exercise Library
          </h1>
          <p className="text-sm text-blue-200/80 mt-1 font-comic">
            Full 7-day morning & evening routines structured for complete athletic fitness and spinal health.
          </p>
        </div>

        {/* View mode toggle: Routines vs Exercise Encyclopedia */}
        <div className="flex items-center p-1.5 ios-glass border border-blue-400/20 rounded-2xl self-start sm:self-auto shadow-md">
          <button
            onClick={() => setActiveSubTab('routines')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-comic transition-all ${
              activeSubTab === 'routines'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-200/70 hover:text-white'
            }`}
          >
            Routines ({WORKOUT_ROUTINES.length})
          </button>
          <button
            onClick={() => setActiveSubTab('exercises')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-comic transition-all ${
              activeSubTab === 'exercises'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-200/70 hover:text-white'
            }`}
          >
            Exercises ({EXERCISES_LIBRARY.length})
          </button>
        </div>
      </div>

      {/* 7-DAY SPLIT NAVIGATION */}
      {activeSubTab === 'routines' && (
        <div className="space-y-3">
          {/* Day of Week Selector */}
          <div className="p-3 rounded-2xl ios-glass border border-blue-400/20 backdrop-blur-xl flex items-center gap-2 overflow-x-auto scrollbar-none shadow-md">
            <span className="text-xs font-bold font-comic text-blue-300/80 flex items-center gap-1.5 pl-1 pr-2 shrink-0">
              <Calendar size={14} className="text-blue-400" />
              <span>Day Plan:</span>
            </span>
            {DAYS_OF_WEEK.map(day => {
              const isToday = day === currentDayName;
              const isSelected = dayFilter === day;
              return (
                <button
                  key={day}
                  onClick={() => setDayFilter(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-comic font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-500 text-white shadow-md border border-blue-300/40'
                      : 'bg-blue-950/40 text-blue-200/80 hover:bg-blue-900/50 hover:text-white border border-blue-400/10'
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Today
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Time Filter Bar (Morning vs Evening vs Punishment) */}
          <div className="p-3 rounded-2xl ios-glass border border-blue-400/20 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-comic font-bold transition-all ${
                  timeFilter === 'all'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-blue-950/40 text-blue-300/70 hover:text-white'
                }`}
              >
                All Sessions
              </button>

              <button
                onClick={() => setTimeFilter('morning')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-comic flex items-center gap-2 transition-all ${
                  timeFilter === 'morning'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 shadow-md scale-102'
                    : 'bg-blue-950/40 text-blue-200/80 hover:bg-blue-900/50 hover:text-white border border-blue-400/15'
                }`}
              >
                <Sun size={15} />
                <span>Morning (05:00 AM)</span>
                {isMorning && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setTimeFilter('evening')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-comic flex items-center gap-2 transition-all ${
                  timeFilter === 'evening'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-102'
                    : 'bg-blue-950/40 text-blue-200/80 hover:bg-blue-900/50 hover:text-white border border-blue-400/15'
                }`}
              >
                <Sunset size={15} />
                <span>Evening (06:00 PM)</span>
                {!isMorning && (
                  <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setTimeFilter('punishment')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-comic flex items-center gap-2 transition-all ${
                  timeFilter === 'punishment'
                    ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-102'
                    : 'bg-rose-950/30 text-rose-300 hover:bg-rose-900/40 hover:text-white border border-rose-500/30'
                }`}
              >
                <Flame size={15} className="text-rose-400 fill-rose-400 animate-pulse" />
                <span>Discipline Penalty</span>
              </button>
            </div>

            <div className="text-xs text-blue-200/70 font-comic hidden md:block">
              {timeFilter === 'morning' && 'Morning awakening: Joint lubrication, mobility, and core activation'}
              {timeFilter === 'evening' && 'Evening reset: Desk fatigue relief, posture correction & sleep prep'}
              {timeFilter === 'punishment' && 'Missed workout protocol: High-intensity metabolic punishment'}
              {timeFilter === 'all' && 'Viewing complete weekly curriculum'}
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ios-glass p-3 rounded-2xl border border-blue-400/20 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-comic font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-white font-bold shadow-sm'
                  : 'bg-blue-950/40 text-blue-200/70 hover:text-white hover:bg-blue-900/50 border border-blue-400/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Difficulty dropdown */}
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="bg-blue-950/60 border border-blue-400/20 text-blue-100 font-comic text-xs rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Search box */}
          <div className="relative flex-1 sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/70" />
            <input
              type="text"
              placeholder="Search routines & exercises..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-blue-950/60 border border-blue-400/20 text-xs font-comic rounded-xl pl-8 pr-3 py-1.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'routines' ? (
        <div className="space-y-4">
          {/* Set & Level Progression Notice Card */}
          <div className="p-4 rounded-3xl ios-glass border border-blue-400/20 bg-blue-950/40 backdrop-blur-xl shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white font-comic">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ব্যায়ামের সেট ও লেভেল গাইড (Progression Sets)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-400/30 font-mono">
                Auto-Adaptive
              </span>
            </div>
            <p className="text-xs text-blue-200/80 leading-relaxed font-comic">
              কোনো জিম অভিজ্ঞতা ছাড়াই ঘরে সহজে শুরু করার জন্য অ্যাপটি স্বয়ংক্রিয়ভাবে প্রতিটি ব্যায়ামের সেট ও বিশ্রাম নির্ধারণ করে দেয়:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-2xl bg-blue-950/60 border border-emerald-500/30 text-xs font-comic">
                <div className="font-bold text-emerald-300 flex items-center gap-1">
                  <span>🟢 বিগিনার (Beginner)</span>
                </div>
                <p className="text-[11px] text-blue-200/80 mt-0.5">
                  প্রতিটি মূল ব্যায়ামে ২ সেট • ২৫ সে. বিশ্রাম (~১৫-১৮ মিনিট)। নতুনদের ও জয়েন্ট সুরক্ষার জন্য নিরাপদ।
                </p>
              </div>
              <div className="p-2.5 rounded-2xl bg-blue-950/60 border border-blue-500/30 text-xs font-comic">
                <div className="font-bold text-blue-300 flex items-center gap-1">
                  <span>🔵 ইন্টারমিডিয়েট (Intermediate)</span>
                </div>
                <p className="text-[11px] text-blue-200/80 mt-0.5">
                  প্রতিটি মূল ব্যায়ামে ৩ সেট • ২০ সে. বিশ্রাম (~২২-২৬ মিনিট)। স্ট্যামিনা ও পেশির শক্তি বৃদ্ধি।
                </p>
              </div>
              <div className="p-2.5 rounded-2xl bg-blue-950/60 border border-amber-500/30 text-xs font-comic">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <span>🔥 অ্যাডভান্সড / প্রো (Advanced)</span>
                </div>
                <p className="text-[11px] text-blue-200/80 mt-0.5">
                  প্রতিটি মূল ব্যায়ামে ৪ সেট • ১৫ সে. বিশ্রাম (~৩০-৩৫ মিনিট)। সর্বোচ্চ ক্যালোরি বার্ন ও কন্ডিশনিং।
                </p>
              </div>
            </div>
          </div>

          {/* Routines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRoutines.map(routine => {
            const isRoutineMorning = routine.timeOfDay === 'morning';
            const isPunishment = routine.isPunishment;
            return (
              <div
                key={routine.id}
                className={`rounded-3xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 group backdrop-blur-2xl ${
                  isPunishment
                    ? 'bg-[#151226]/85 border-rose-500/40 shadow-[0_8px_32px_rgba(244,63,94,0.2)] hover:border-rose-500/70'
                    : isRoutineMorning
                    ? 'bg-[#0f1d3a]/75 border-amber-500/25 hover:border-amber-500/50 shadow-lg'
                    : 'bg-[#0f1d3a]/75 border-blue-500/25 hover:border-blue-500/50 shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[10px] font-comic font-bold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      isPunishment
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                        : isRoutineMorning
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    }`}>
                      {isPunishment ? (
                        <Flame size={12} className="text-rose-400 fill-rose-400" />
                      ) : isRoutineMorning ? (
                        <Sun size={11} />
                      ) : (
                        <Sunset size={11} />
                      )}
                      <span>
                        {isPunishment
                          ? 'Discipline Penalty'
                          : isRoutineMorning
                          ? 'Morning Session (05:00 AM)'
                          : 'Evening Session (06:00 PM)'}
                      </span>
                    </span>

                    <div className="flex items-center gap-1 text-xs text-blue-200/70 font-comic">
                      <Clock size={13} className="text-blue-400" />
                      <span>~{routine.estimatedMinutes} min</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-comic text-white group-hover:text-blue-100 transition-colors">
                    {routine.title}
                  </h3>

                  <p className="text-xs text-blue-200/80 mt-2 leading-relaxed font-comic">
                    {routine.subtitle || routine.description}
                  </p>

                  {/* Exercises overview preview pill */}
                  <div className="mt-4 pt-3 border-t border-blue-400/15 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-blue-300/70">
                      <span className="font-comic">Curriculum ({routine.exercises.length} Exercises)</span>
                      <span className="text-[10px] font-comic text-blue-400/80">Click exercise for guide</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {routine.exercises.map((item, idx) => {
                        const ex = EXERCISES_LIBRARY.find(e => e.id === item.exerciseId);
                        const exerciseName = ex ? ex.name : item.exerciseId.replace(/_/g, ' ');
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => ex && onOpenExerciseDetails(ex)}
                            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-100 border border-blue-400/15 cursor-pointer transition-colors font-comic text-left active:scale-95"
                            title="Click to view form guide and instructions"
                          >
                            <span>{exerciseName}</span>
                            <Info size={11} className="text-blue-400 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Start CTA */}
                <div className="mt-5 pt-4 border-t border-blue-400/15 flex items-center justify-between">
                  <span className="text-xs text-blue-300/70 capitalize font-comic">
                    Level: <span className="text-blue-100 font-bold">{routine.difficulty}</span>
                  </span>

                  <button
                    onClick={() => onStartRoutine(routine)}
                    className={`px-5 py-2.5 rounded-2xl font-bold font-comic text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                      isPunishment
                        ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                        : isRoutineMorning
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 hover:brightness-105'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:brightness-105'
                    }`}
                  >
                    {isPunishment ? (
                      <Flame size={14} className="text-yellow-200 fill-yellow-200" />
                    ) : (
                      <Play size={13} fill="currentColor" />
                    )}
                    <span>{isPunishment ? 'Execute Penalty' : 'Start Routine'}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredRoutines.length === 0 && (
            <div className="col-span-2 p-8 text-center bg-blue-950/40 border border-blue-400/20 rounded-2xl">
              <p className="text-sm text-blue-200/70 font-comic">No routines found matching your filter criteria.</p>
            </div>
          )}
          </div>
        </div>
      ) : (
        /* Exercise Encyclopedia List */
        <div className="space-y-3">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              className="ios-glass-card rounded-2xl p-4.5 transition-all shadow-md hover:border-blue-400/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white font-comic">
                      {exercise.name}
                    </h3>
                    <span className="text-[10px] uppercase font-comic px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-200 border border-blue-400/20">
                      {exercise.category.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-comic px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-400/30">
                      {exercise.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-blue-200/80 leading-relaxed font-comic">
                    <span className="font-semibold text-white">Purpose: </span>
                    {exercise.purpose}
                  </p>

                  <div className="flex flex-wrap gap-1 text-[11px] text-blue-300/70 font-comic">
                    <span className="text-blue-300 font-medium">Target Muscles: </span>
                    {exercise.targetMuscles.map((m, idx) => (
                      <span key={idx} className="bg-blue-950/50 px-2 py-0.5 rounded-md text-blue-200 border border-blue-400/15">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-center shrink-0 justify-end flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => onOpenExerciseDetails(exercise)}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl bg-blue-950/70 hover:bg-blue-900/70 text-xs font-comic text-blue-200 flex items-center gap-1.5 transition-colors border border-blue-400/25 active:scale-95 touch-manipulation shadow-sm"
                  >
                    <Info size={14} className="text-blue-400" />
                    <span>Form Guide & Animation</span>
                  </button>

                  <button
                    onClick={() => onStartSingleExercise(exercise)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-comic flex items-center gap-1.5 transition-all shadow-md active:scale-95 touch-manipulation border border-blue-400/30"
                  >
                    <Play size={13} fill="currentColor" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredExercises.length === 0 && (
            <div className="p-8 text-center ios-glass rounded-2xl border border-blue-400/20">
              <p className="text-sm text-blue-200/70 font-comic">No exercises found matching your search query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
