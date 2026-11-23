import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  Flame,
  Award,
  Sparkles
} from 'lucide-react';
import { WorkoutSessionLog, BodyMetric } from '../types';

interface ProgressViewProps {
  sessions: WorkoutSessionLog[];
  metrics: BodyMetric[];
  onAddMetric: (metric: BodyMetric) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  sessions,
  metrics,
  onAddMetric
}) => {
  const [showAddMetricModal, setShowAddMetricModal] = useState(false);
  const [metricWeight, setMetricWeight] = useState('');
  const [metricWaist, setMetricWaist] = useState('');
  const [metricChest, setMetricChest] = useState('');
  const [metricNotes, setMetricNotes] = useState('');

  // Overall calculations
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  // Real streak calculation matching Overview
  const getLocalDateStr = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getLocalDateStr(new Date());
  const yesterdayStr = getLocalDateStr(new Date(Date.now() - 86400000));
  const daysSet = new Set((sessions || []).map(s => getLocalDateStr(new Date(s.timestamp))));
  const hasWorkedOutToday = daysSet.has(todayStr);
  const hasWorkedOutYesterday = daysSet.has(yesterdayStr);

  const calculateStreak = (): number => {
    if (!sessions || sessions.length === 0) return 0;
    if (!hasWorkedOutToday && !hasWorkedOutYesterday) return 0;
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

  // Past 7 days breakdown for bar chart
  const last7DaysData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const daySessions = sessions.filter(
      s => new Date(s.timestamp).toISOString().split('T')[0] === dateStr
    );
    const minutes = daySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);
    return {
      dayLabel,
      dateStr,
      minutes,
      count: daySessions.length
    };
  });

  const maxMinutesInDay = Math.max(40, ...last7DaysData.map(d => d.minutes));

  const handleSaveMetric = (e: React.FormEvent) => {
    e.preventDefault();
    const newMetric: BodyMetric = {
      id: 'm_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      weightKg: metricWeight ? parseFloat(metricWeight) : undefined,
      waistCm: metricWaist ? parseFloat(metricWaist) : undefined,
      chestCm: metricChest ? parseFloat(metricChest) : undefined,
      notes: metricNotes.trim() || undefined
    };
    onAddMetric(newMetric);
    setShowAddMetricModal(false);
    setMetricWeight('');
    setMetricWaist('');
    setMetricChest('');
    setMetricNotes('');
  };

  return (
    <div id="progress-view" className="max-w-5xl mx-auto space-y-6 pb-12 font-comic">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Progress &amp; Habit Discipline
        </h1>
        <p className="text-sm text-blue-200/80 mt-1">
          Fitness is built one quiet day at a time. No vanity metrics, no guilt, pure discipline.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ios-glass-card rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-blue-200/80 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Sessions Done</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalSessions}
          </div>
          <p className="text-xs text-blue-300/70 mt-1">
            Total workouts recorded
          </p>
        </div>

        <div className="ios-glass-card rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-blue-200/80 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Time Trained</span>
            <Clock size={16} className="text-blue-300" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalMinutes} <span className="text-base font-normal text-blue-200/70">mins</span>
          </div>
          <p className="text-xs text-blue-300/70 mt-1">
            ~{avgDuration} min average per session
          </p>
        </div>

        <div className="ios-glass-card rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-blue-200/80 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Discipline Streak</span>
            <Flame size={16} className={streakDays > 0 ? 'text-amber-400 animate-pulse' : 'text-blue-500/50'} />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {streakDays} <span className="text-base font-normal text-blue-200/70">days</span>
          </div>
          <p className="text-xs text-blue-300/70 mt-1">
            {streakDays > 0 ? 'Consecutive daily workouts' : 'Complete today’s workout to begin'}
          </p>
        </div>

        <div className="ios-glass-card rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-blue-200/80 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Habit Mindset</span>
            <Award size={16} className="text-blue-300" />
          </div>
          <div className="text-lg font-bold text-white">
            Lifelong Mobility
          </div>
          <p className="text-xs text-blue-300/70 mt-1">
            Pain-free posture &amp; joints
          </p>
        </div>
      </div>

      {/* Weekly Consistency Chart */}
      <div className="ios-glass-card rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              7-Day Activity Volume
            </h2>
            <p className="text-xs text-blue-200/80 mt-0.5">
              Daily minutes of completed physical training
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30 self-start">
            Target: 20-30 min/day
          </span>
        </div>

        {/* Bar Chart Representation */}
        <div className="h-44 flex items-end justify-between gap-3 pt-4 border-b border-blue-400/15 pb-2">
          {last7DaysData.map((d, idx) => {
            const heightPercent = d.minutes > 0
              ? Math.max(15, Math.round((d.minutes / maxMinutesInDay) * 100))
              : 8;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div className="text-[11px] font-bold text-blue-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.minutes}m
                </div>
                <div
                  className="w-full max-w-[48px] rounded-t-xl transition-all duration-500 shadow-sm"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: d.minutes > 0 ? '#38bdf8' : '#1e293b'
                  }}
                />
                <span className="text-xs font-semibold text-blue-200/70 mt-2 group-hover:text-white">
                  {d.dayLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Coach philosophy note */}
        <div className="mt-4 p-4 rounded-2xl bg-blue-950/50 border border-blue-400/20 text-xs text-blue-200/90 flex items-start gap-3">
          <Sparkles size={16} className="text-blue-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Coaching Truth: </strong>
            Movement cannot selectively burn fat from one spot. Body composition responds to total weekly energy balance, nutrient-rich diet, deep restorative sleep, and consistent physical training.
          </p>
        </div>
      </div>

      {/* Two Columns: Recent Session Logs & Optional Private Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workout History */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Recent Sessions
              </h3>
              <span className="text-xs text-blue-300/70">
                {sessions.length} total
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {sessions.slice(0, 8).map(s => (
                <div
                  key={s.id}
                  className="p-3 rounded-2xl bg-blue-950/50 border border-blue-400/20 flex items-start justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">{s.routineTitle}</div>
                    <div className="text-blue-200/70">
                      {new Date(s.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      {' • '}
                      {s.durationMinutes} minutes
                    </div>
                    {s.notes && (
                      <p className="text-[11px] text-blue-200/80 italic pt-1">
                        &quot;{s.notes}&quot;
                      </p>
                    )}
                  </div>
                  {s.rating && (
                    <div className="text-amber-400 text-xs shrink-0 font-mono">
                      {'★'.repeat(s.rating)}
                    </div>
                  )}
                </div>
              ))}

              {sessions.length === 0 && (
                <div className="p-6 text-center text-xs text-blue-300/70">
                  No sessions recorded yet. Start your first workout today!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional Private Measurements */}
        <div className="ios-glass-card rounded-3xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Private Body Metrics
                </h3>
                <span className="text-[11px] text-blue-300/70">
                  Optional &amp; strictly saved on your device
                </span>
              </div>

              <button
                onClick={() => setShowAddMetricModal(true)}
                className="px-3 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800/60 text-xs font-bold text-white flex items-center gap-1 transition-colors border border-blue-400/20"
              >
                <Plus size={13} />
                <span>Log Check-in</span>
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {metrics.map(m => (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl bg-blue-950/50 border border-blue-400/20 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="text-blue-300 font-bold">{m.date}</div>
                    {m.notes && <div className="text-[11px] text-blue-200/70 italic mt-0.5">{m.notes}</div>}
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    {m.weightKg && (
                      <div>
                        <span className="text-[10px] text-blue-300/70 block uppercase font-bold">Weight</span>
                        <span className="font-bold text-white">{m.weightKg} kg</span>
                      </div>
                    )}
                    {m.waistCm && (
                      <div>
                        <span className="text-[10px] text-blue-300/70 block uppercase font-bold">Waist</span>
                        <span className="font-bold text-white">{m.waistCm} cm</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {metrics.length === 0 && (
                <div className="p-6 text-center text-xs text-blue-300/70">
                  No measurement entries yet. Log an entry only if helpful for your personal goals.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-400/15 text-[11px] text-blue-300/70 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Encrypted locally in browser LocalStorage. Zero telemetry.</span>
          </div>
        </div>
      </div>

      {/* Add Metric Modal */}
      {showAddMetricModal && (
        <div className="fixed inset-0 z-50 bg-blue-950/80 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#0c1830]/95 border border-blue-400/30 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div>
              <h3 className="text-base font-bold text-white">
                Log Body Check-in
              </h3>
              <p className="text-xs text-blue-200/80 mt-0.5">
                All measurements are completely optional and stay private on your device.
              </p>
            </div>

            <form onSubmit={handleSaveMetric} className="space-y-3 text-xs">
              <div>
                <label className="block text-blue-200/80 mb-1 font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 72.0"
                  value={metricWeight}
                  onChange={e => setMetricWeight(e.target.value)}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-blue-200/80 mb-1 font-semibold">Waist circumference (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 84.0"
                  value={metricWaist}
                  onChange={e => setMetricWaist(e.target.value)}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-blue-200/80 mb-1 font-semibold">Chest circumference (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 96.0"
                  value={metricChest}
                  onChange={e => setMetricChest(e.target.value)}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-blue-200/80 mb-1 font-semibold">Check-in Note</label>
                <input
                  type="text"
                  placeholder="e.g. Energy feels great; posture improved"
                  value={metricNotes}
                  onChange={e => setMetricNotes(e.target.value)}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMetricModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-blue-950/60 text-blue-200 hover:text-white border border-blue-400/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white font-bold shadow-md"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
