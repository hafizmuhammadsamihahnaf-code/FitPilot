import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Timer as TimerIcon, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  UserCheck, 
  Settings as SettingsIcon,
  Play,
  Pause,
  Lock,
  Download
} from 'lucide-react';
import { ActiveTab, ActiveWorkoutState } from '../types';

interface SidebarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  activeWorkout: ActiveWorkoutState | null;
  onResumeWorkout: () => void;
  onOpenInstallModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeWorkout,
  onResumeWorkout,
  onOpenInstallModal
}) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'training' as ActiveTab, label: 'Training', icon: Dumbbell },
    { id: 'timer' as ActiveTab, label: 'Timer', icon: TimerIcon, hasBadge: !!activeWorkout },
    { id: 'progress' as ActiveTab, label: 'Progress', icon: TrendingUp },
    { id: 'calendar' as ActiveTab, label: 'Calendar', icon: CalendarIcon },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: UserCheck },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <aside
      id="fitpilot-sidebar"
      className="w-56 ios-glass border-r border-blue-400/20 flex flex-col justify-between shrink-0 select-none py-4 px-3 backdrop-blur-2xl z-20"
    >
      <div>
        {/* Brand header */}
        <div className="px-3 pb-4 mb-3 border-b border-blue-400/15">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-comic">
            <span className="text-blue-200">FitPilot</span>
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-400/30">
              v1.0
            </span>
          </div>
          <p className="text-[11px] text-blue-300/70 mt-1 font-comic">Calm daily fitness companion</p>
        </div>

        {/* Active workout quick widget */}
        {activeWorkout && (
          <div className="mx-1 mb-4 p-3 rounded-2xl bg-blue-950/70 border border-blue-400/30 text-xs shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between text-blue-300 font-comic font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                Active Session
              </span>
              <span className="font-mono text-[11px] text-white font-bold">
                {Math.floor(activeWorkout.timeRemainingSeconds / 60)}:
                {String(activeWorkout.timeRemainingSeconds % 60).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-blue-100/90 mb-2 font-comic">
              <span className="truncate">{activeWorkout.routineTitle}</span>
              {activeWorkout.currentSet && activeWorkout.totalSets && activeWorkout.totalSets > 1 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900/80 border border-blue-400/30 text-blue-200 font-mono shrink-0 ml-1">
                  S{activeWorkout.currentSet}/{activeWorkout.totalSets}
                </span>
              )}
            </div>
            <button
              onClick={onResumeWorkout}
              className="w-full py-1.5 px-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white font-comic font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all shadow-md active:scale-95"
            >
              {activeWorkout.isRunning ? <Pause size={12} /> : <Play size={12} />}
              <span>{activeWorkout.isRunning ? 'View Timer' : 'Resume Timer'}</span>
            </button>
          </div>
        )}

        {/* Navigation items list */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold font-comic transition-all text-left ${
                  isActive
                    ? 'bg-blue-600/90 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] border border-blue-300/30 scale-[1.02]'
                    : 'text-blue-200/70 hover:text-white hover:bg-blue-950/40 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={isActive ? 'text-white' : 'text-blue-300/70'} />
                  <span>{item.label}</span>
                </div>
                {item.hasBadge && (
                  <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer: Install App CTA & Local Storage Indicator */}
      <div className="pt-3 border-t border-blue-400/15 px-1 space-y-2 text-[11px] text-blue-300/70 font-comic">
        <button
          onClick={onOpenInstallModal}
          className="w-full py-2.5 px-3 rounded-2xl bg-blue-600/90 hover:bg-blue-600 border border-blue-400/30 text-white font-semibold flex items-center justify-center gap-2 transition-all text-xs active:scale-95 shadow-md"
        >
          <Download size={14} className="text-white" />
          <span>Install .EXE / Android</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-blue-300/60 px-1 pt-0.5 text-[10px]">
          <Lock size={11} className="text-blue-400/80" />
          <span>Local & 100% Private</span>
        </div>
      </div>
    </aside>
  );
};
