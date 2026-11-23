import React, { useState, useRef } from 'react';
import { 
  Sliders, 
  Volume2, 
  VolumeX, 
  Mic, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Keyboard, 
  Code, 
  Terminal, 
  FileText,
  Copy,
  Laptop,
  Smartphone,
  Bell,
  Sun,
  Moon,
  Clock,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { AppSettings, WorkoutAlarmSettings } from '../types';
import { StorageService } from '../services/storage';
import { soundEngine } from '../services/audio';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onDataReload: () => void;
  onOpenInstallModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onDataReload,
  onOpenInstallModal
}) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    onUpdateSettings(updated);
    soundEngine.setMuted(!updated.soundEnabled);
  };

  const handleToggleVoice = () => {
    const updated = { ...settings, voiceCuesEnabled: !settings.voiceCuesEnabled };
    onUpdateSettings(updated);
    soundEngine.setVoiceEnabled(updated.voiceCuesEnabled);
    if (updated.voiceCuesEnabled) {
      soundEngine.speakVoiceCue('Voice cues enabled');
    }
  };

  const handleVolumeChange = (vol: number) => {
    const updated = { ...settings, soundVolume: vol };
    onUpdateSettings(updated);
    soundEngine.setVolume(vol);
  };

  const handleTestAudio = () => {
    soundEngine.playStartWorkChime();
    setTimeout(() => {
      soundEngine.speakVoiceCue('FitPilot audio test successful');
    }, 600);
  };

  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitpilot_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      const success = StorageService.importData(content);
      if (success) {
        setImportStatus('Data successfully restored!');
        onDataReload();
      } else {
        setImportStatus('Failed to import. Please check file format.');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all FitPilot data? This clears local workout logs and custom profiles.')) {
      StorageService.resetAllData();
      onDataReload();
      alert('FitPilot data reset to defaults.');
    }
  };

  const copyPySideScript = () => {
    const script = `# FitPilot - Windows Desktop Standalone Native App (PySide6)
# Build instructions:
# 1. pip install -r requirements.txt
# 2. pyinstaller --onefile --noconsole --name "FitPilot" FitPilot.py

import sys
from PySide6.QtCore import Qt, QTimer
from PySide6.QtWidgets import (
    QApplication, QWidget, QMainWindow, QLabel, QPushButton, QVBoxLayout,
    QHBoxLayout, QGridLayout, QFrame, QStackedWidget, QListWidget,
    QProgressBar, QScrollArea, QTimeEdit
)

print("FitPilot Windows Native Standalone App Ready")
`;
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div id="settings-view" className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-comic">
          Preferences & Audio Configuration
        </h1>
        <p className="text-sm text-blue-200/80 mt-1 font-comic">
          Customize sound cues, audio volumes, daily alarm schedules, and local offline backups.
        </p>
      </div>

      {/* Audio & Acoustic Feedback Settings */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-comic">
            <Volume2 size={18} className="text-blue-400" />
            <h2 className="text-base font-bold uppercase tracking-wider">
              Audio Guidance & Voice Coach
            </h2>
          </div>
          <button
            onClick={handleTestAudio}
            className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 text-xs font-semibold text-blue-200 flex items-center gap-1.5 transition-colors font-comic"
          >
            <Volume2 size={13} />
            <span>Test Sound & Voice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sound master toggle */}
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/15 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-semibold text-white text-sm font-comic">Sound Effects</div>
              <div className="text-xs text-blue-200/70 font-comic">Audible count chimes and exercise bells</div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.soundEnabled ? 'bg-blue-500 shadow-md' : 'bg-blue-950/80 border border-blue-400/20'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.soundEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Voice Cues toggle */}
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/15 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-semibold text-white text-sm font-comic">Spoken Voice Cues</div>
              <div className="text-xs text-blue-200/70 font-comic">Spoken countdowns and exercise announcements</div>
            </div>
            <button
              onClick={handleToggleVoice}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.voiceCuesEnabled ? 'bg-blue-500 shadow-md' : 'bg-blue-950/80 border border-blue-400/20'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.voiceCuesEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-blue-200 font-comic">
            <span>Audio Volume Level</span>
            <span className="font-bold font-mono">{settings.soundVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.soundVolume}
            onChange={e => handleVolumeChange(Number(e.target.value))}
            className="w-full h-2 bg-blue-950/80 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-blue-400/20"
          />
        </div>
      </div>

      {/* Workout Alarms & Dual Schedule (Morning & Evening) */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-comic">
              <Bell size={18} className="text-amber-400" />
              <span>Mandatory Workout Alarms (Non-Disableable Habits)</span>
            </h2>
            <p className="text-xs text-blue-200/70 mt-0.5 font-comic">
              Permanent daily discipline. Alarms ring automatically at scheduled times and can be dismissed/silenced by hand when triggered.
            </p>
          </div>

          <button
            onClick={() => soundEngine.playAlarmChime(2)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 text-xs font-semibold text-blue-100 flex items-center gap-1.5 transition-colors font-comic"
            title="Test Alarm Sound"
          >
            <Volume2 size={13} className="text-amber-400" />
            <span>Test Alarm Sound</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Morning Alarm Card (05:00 AM Default) */}
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-amber-500/25 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sun size={17} />
                </div>
                <div>
                  <div className="font-bold text-sm text-white font-comic">Morning Alarm (05:00 AM)</div>
                  <div className="text-[11px] text-blue-200/70 font-comic">Joint lubrication & core awakening</div>
                </div>
              </div>

              {/* Locked Active Status (Cannot be disabled in advance) */}
              <div 
                title="Mandatory Habit: Alarm cannot be pre-disabled. When it rings, you can dismiss it by hand."
                className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-comic font-bold text-[10px] flex items-center gap-1 shadow-sm"
              >
                <Lock size={10} />
                <span>Always Armed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-comic">
              <div>
                <label className="block text-blue-300/70 mb-1 font-medium text-[11px]">
                  Alarm Time
                </label>
                <input
                  type="time"
                  value={settings.alarms?.morning.time || '05:00'}
                  onChange={e => {
                    const current = settings.alarms || StorageService.getDefaultAlarmSettings();
                    onUpdateSettings({
                      ...settings,
                      alarms: {
                        ...current,
                        morning: { ...current.morning, time: e.target.value, enabled: true }
                      }
                    });
                  }}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl px-2.5 py-1.5 text-white font-comic text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-blue-300/70 mb-1 font-medium text-[11px]">
                  Target Exercises
                </label>
                <input
                  type="number"
                  min="3"
                  max="15"
                  value={settings.alarms?.morning.targetExercisesCount || 7}
                  onChange={e => {
                    const current = settings.alarms || StorageService.getDefaultAlarmSettings();
                    onUpdateSettings({
                      ...settings,
                      alarms: {
                        ...current,
                        morning: { ...current.morning, targetExercisesCount: Number(e.target.value), enabled: true }
                      }
                    });
                  }}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl px-2.5 py-1.5 text-white font-comic text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Evening Alarm Card (18:00 Default) */}
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Moon size={17} />
                </div>
                <div>
                  <div className="font-bold text-sm text-white font-comic">Evening Alarm ({settings.alarms?.evening?.time === '18:00' || !settings.alarms?.evening?.time ? '06:00 PM' : settings.alarms.evening.time})</div>
                  <div className="text-[11px] text-blue-200/70 font-comic">Posture reset & desk relief</div>
                </div>
              </div>

              {/* Locked Active Status (Cannot be disabled in advance) */}
              <div 
                title="Mandatory Habit: Alarm cannot be pre-disabled. When it rings, you can dismiss it by hand."
                className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 font-comic font-bold text-[10px] flex items-center gap-1 shadow-sm"
              >
                <Lock size={10} />
                <span>Always Armed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-comic">
              <div>
                <label className="block text-blue-300/70 mb-1 font-medium text-[11px]">
                  Alarm Time
                </label>
                <input
                  type="time"
                  value={settings.alarms?.evening.time || '18:00'}
                  onChange={e => {
                    const current = settings.alarms || StorageService.getDefaultAlarmSettings();
                    onUpdateSettings({
                      ...settings,
                      alarms: {
                        ...current,
                        evening: { ...current.evening, time: e.target.value, enabled: true }
                      }
                    });
                  }}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl px-2.5 py-1.5 text-white font-comic text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-blue-300/70 mb-1 font-medium text-[11px]">
                  Target Exercises
                </label>
                <input
                  type="number"
                  min="3"
                  max="15"
                  value={settings.alarms?.evening.targetExercisesCount || 6}
                  onChange={e => {
                    const current = settings.alarms || StorageService.getDefaultAlarmSettings();
                    onUpdateSettings({
                      ...settings,
                      alarms: {
                        ...current,
                        evening: { ...current.evening, targetExercisesCount: Number(e.target.value), enabled: true }
                      }
                    });
                  }}
                  className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl px-2.5 py-1.5 text-white font-comic text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timer & Pacing Preferences */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider font-comic">
          Timer Pacing & Automation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-comic">
          <div>
            <label className="block text-blue-200/80 mb-1.5 font-medium">
              Preparation Countdown (Seconds)
            </label>
            <select
              value={settings.prepCountdownSeconds}
              onChange={e => onUpdateSettings({ ...settings, prepCountdownSeconds: Number(e.target.value) })}
              className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-3 text-sm text-white focus:outline-none"
            >
              <option value={3}>3 seconds (Fast)</option>
              <option value={5}>5 seconds (Standard)</option>
              <option value={10}>10 seconds (Generous get-ready time)</option>
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/15 flex items-center justify-between self-end">
            <div>
              <div className="font-semibold text-white">Auto-Advance Intervals</div>
              <div className="text-[11px] text-blue-300/70">Automatically transition after rest period</div>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, autoAdvanceExercises: !settings.autoAdvanceExercises })}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.autoAdvanceExercises ? 'bg-blue-500 shadow-md' : 'bg-blue-950/80 border border-blue-400/20'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.autoAdvanceExercises ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management: Export & Import */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider font-comic">
          Data Backup & Offline Portability
        </h2>
        <p className="text-xs text-blue-200/80 font-comic">
          All workout logs and metrics are stored locally on your device. Export a JSON file to backup your history or transfer to another PC.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-comic">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 text-white font-semibold flex items-center gap-2 transition-colors"
          >
            <Download size={14} />
            <span>Export Backup (JSON)</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 text-white font-semibold flex items-center gap-2 transition-colors"
          >
            <Upload size={14} />
            <span>Import Backup</span>
          </button>

          <button
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 font-semibold flex items-center gap-2 transition-colors ml-auto"
          >
            <RotateCcw size={14} />
            <span>Reset All Data</span>
          </button>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-400/30 text-blue-200 text-xs flex items-center gap-2 font-comic">
            <Check size={14} className="text-emerald-400" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-comic">
          <Keyboard size={18} className="text-blue-400" />
          <h2 className="text-base font-bold uppercase tracking-wider">
            Windows Desktop Keyboard Controls
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-comic">
          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-400/15">
            <span className="px-2.5 py-1 rounded-lg bg-blue-900/60 font-mono font-bold text-white inline-block mb-1.5 border border-blue-400/25">
              Space
            </span>
            <div className="text-blue-200/70">Play / Pause Timer</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-400/15">
            <span className="px-2.5 py-1 rounded-lg bg-blue-900/60 font-mono font-bold text-white inline-block mb-1.5 border border-blue-400/25">
              → Right
            </span>
            <div className="text-blue-200/70">Skip to Next Exercise</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-400/15">
            <span className="px-2.5 py-1 rounded-lg bg-blue-900/60 font-mono font-bold text-white inline-block mb-1.5 border border-blue-400/25">
              ← Left
            </span>
            <div className="text-blue-200/70">Previous Exercise</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-400/15">
            <span className="px-2.5 py-1 rounded-lg bg-blue-900/60 font-mono font-bold text-white inline-block mb-1.5 border border-blue-400/25">
              M
            </span>
            <div className="text-blue-200/70">Mute / Unmute Audio</div>
          </div>
        </div>
      </div>

      {/* App Installation & Android Deployment Card */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-4 border-blue-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-comic">
            <Smartphone size={18} className="text-blue-400" />
            <h2 className="text-base font-bold uppercase tracking-wider">
              Android Full Access & Windows .EXE Desktop
            </h2>
          </div>
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white text-xs font-bold font-comic flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Download size={13} />
              <span>View Install Guide</span>
            </button>
          )}
        </div>

        <p className="text-xs text-blue-200/80 leading-relaxed font-comic">
          FitPilot runs full-screen without address bars as an installed offline app on both Android phones and Windows PCs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-comic">
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/15 space-y-1.5">
            <div className="font-bold text-blue-300 flex items-center gap-1.5 font-comic">
              <Smartphone size={14} />
              <span>Android Phone Install</span>
            </div>
            <p className="text-[11px] text-blue-200/70 leading-relaxed">
              Open this link in Chrome on your phone, tap <strong>⋮ (Three dots) &gt; Install app</strong> or <strong>Add to Home screen</strong>. It launches as a full-screen native mobile application.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/15 space-y-1.5">
            <div className="font-bold text-blue-300 flex items-center gap-1.5 font-comic">
              <Laptop size={14} />
              <span>Windows Standalone .EXE</span>
            </div>
            <p className="text-[11px] text-blue-200/70 leading-relaxed">
              Run <code>FitPilot_desktop.py</code> or execute the <code>build_windows.bat</code> script to generate a single standalone <code>FitPilot.exe</code> executable.
            </p>
          </div>
        </div>
      </div>

      {/* Standalone Windows EXE Python/PySide6 Build Pack */}
      <div className="ios-glass-card rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-comic">
            <Laptop size={18} className="text-blue-400" />
            <h2 className="text-base font-bold uppercase tracking-wider">
              Windows Native EXE Build Recipe
            </h2>
          </div>
          <button
            onClick={copyPySideScript}
            className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 text-xs font-semibold text-blue-200 flex items-center gap-1.5 transition-colors font-comic"
          >
            {copiedScript ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copiedScript ? 'Copied Python Script!' : 'Copy PySide6 Code'}</span>
          </button>
        </div>

        <p className="text-xs text-blue-200/80 font-comic">
          If you wish to compile a native offline Windows <code>.exe</code> via Python + PySide6:
        </p>

        <div className="bg-blue-950/70 border border-blue-400/20 rounded-2xl p-3.5 font-mono text-xs text-blue-200 space-y-1.5">
          <div className="text-blue-400/70"># Install PySide6 &amp; PyInstaller</div>
          <div>pip install PySide6 pyinstaller</div>
          <div className="text-blue-400/70 pt-1"># Build single-file Windows executable</div>
          <div>pyinstaller --onefile --windowed --name &quot;FitPilot&quot; main.py</div>
        </div>
      </div>
    </div>
  );
};
