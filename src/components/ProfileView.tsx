import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  Save, 
  Check, 
  Sparkles
} from 'lucide-react';
import { UserProfile, DifficultyLevel, EquipmentType } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onSaveProfile
}) => {
  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(profile.age || 25);
  const [experienceLevel, setExperienceLevel] = useState<DifficultyLevel>(
    profile.experienceLevel || 'beginner'
  );
  const [dailyAvailableMinutes, setDailyAvailableMinutes] = useState(
    profile.dailyAvailableMinutes || 30
  );
  const [equipment, setEquipment] = useState<EquipmentType[]>(
    profile.equipment || ['none', 'mat']
  );
  const [goals, setGoals] = useState<string[]>(
    profile.goals || ['Build consistency', 'Relieve desk posture stiffness']
  );
  const [preferredDays, setPreferredDays] = useState<number[]>(
    profile.preferredWorkoutDays || [1, 3, 5]
  );
  const [savedNotice, setSavedNotice] = useState(false);

  const availableGoals = [
    'Build consistency',
    'Relieve desk posture stiffness',
    'Full-body mobility & joints',
    'Core & lumbar stability',
    'Low-impact cardiovascular conditioning',
    'Functional strength for longevity'
  ];

  const daysOfWeek = [
    { num: 0, label: 'Sun' },
    { num: 1, label: 'Mon' },
    { num: 2, label: 'Tue' },
    { num: 3, label: 'Wed' },
    { num: 4, label: 'Thu' },
    { num: 5, label: 'Fri' },
    { num: 6, label: 'Sat' }
  ];

  const toggleEquipment = (item: EquipmentType) => {
    if (equipment.includes(item)) {
      setEquipment(equipment.filter(e => e !== item));
    } else {
      setEquipment([...equipment, item]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const toggleDay = (dayNum: number) => {
    if (preferredDays.includes(dayNum)) {
      setPreferredDays(preferredDays.filter(d => d !== dayNum));
    } else {
      setPreferredDays([...preferredDays, dayNum]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Pilot',
      age: Number(age),
      experienceLevel,
      dailyAvailableMinutes: Number(dailyAvailableMinutes),
      equipment,
      goals,
      preferredWorkoutDays: preferredDays,
      onboardingCompleted: true
    };
    onSaveProfile(updated);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div id="profile-view" className="max-w-4xl mx-auto space-y-6 pb-12 font-comic">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Profile &amp; Training Personalization
        </h1>
        <p className="text-sm text-blue-200/80 mt-1">
          FitPilot adapts exercise selections and intensity to your lifestyle, equipment, and fitness goals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Personal Setup */}
        <div className="ios-glass-card rounded-3xl p-6 space-y-4 shadow-lg">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Personal Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-blue-200/80 mb-1.5 font-medium">
                Your Name or Call-sign
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Samih"
                className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-blue-200/80 mb-1.5 font-medium">
                Age
              </label>
              <input
                type="number"
                min={13}
                max={105}
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-blue-200/80 mb-1.5 font-medium">
                Training Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value as DifficultyLevel)}
                className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-400"
              >
                <option value="beginner">Beginner: 2 Sets • 25s Rest (নতুনদের জন্য নিরাপদ ও সহজ)</option>
                <option value="intermediate">Intermediate: 3 Sets • 20s Rest (শক্তি ও স্ট্যামিনা বৃদ্ধি)</option>
                <option value="advanced">Advanced / Pro: 4 Sets • 15s Rest (হাই ইনটেনসিটি ও কন্ডিশনিং)</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-200/80 mb-1.5 font-medium">
                Daily Available Workout Time
              </label>
              <select
                value={dailyAvailableMinutes}
                onChange={e => setDailyAvailableMinutes(Number(e.target.value))}
                className="w-full bg-blue-950/60 border border-blue-400/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-400"
              >
                <option value={15}>15 minutes (Quick Mobility &amp; Awakening)</option>
                <option value={30}>30 minutes (Standard Complete Session)</option>
                <option value={45}>45 minutes (Extended Strength &amp; Cardio)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Equipment Available */}
        <div className="ios-glass-card rounded-3xl p-6 space-y-3 shadow-lg">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Available Equipment
          </h2>
          <p className="text-xs text-blue-200/80">
            Select items available to you. Zero equipment bodyweight workouts are supported natively.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
            {[
              { id: 'none' as EquipmentType, label: 'Bodyweight Only' },
              { id: 'mat' as EquipmentType, label: 'Exercise Mat' },
              { id: 'chair' as EquipmentType, label: 'Sturdy Chair / Desk' },
              { id: 'bands' as EquipmentType, label: 'Resistance Bands' }
            ].map(item => {
              const isSelected = equipment.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleEquipment(item.id)}
                  className={`p-3 rounded-2xl border text-left font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600/50 border-blue-400 text-white shadow-md'
                      : 'bg-blue-950/40 border-blue-400/15 text-blue-200/70 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {isSelected && <Check size={14} className="text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Goals */}
        <div className="ios-glass-card rounded-3xl p-6 space-y-3 shadow-lg">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Primary Wellness &amp; Fitness Goals
          </h2>
          <p className="text-xs text-blue-200/80">
            Choose what matters most to your training schedule right now.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            {availableGoals.map(goal => {
              const isSelected = goals.includes(goal);
              return (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-3 rounded-2xl border text-left font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/50 border-blue-400 text-white shadow-md'
                      : 'bg-blue-950/40 border-blue-400/15 text-blue-200/70 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  <span>{goal}</span>
                  {isSelected && <Check size={14} className="text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Workout Schedule */}
        <div className="ios-glass-card rounded-3xl p-6 space-y-3 shadow-lg">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Preferred Weekly Schedule
          </h2>
          <p className="text-xs text-blue-200/80">
            Target 3 to 5 days for optimal recovery and consistent adaptation.
          </p>

          <div className="flex items-center gap-2 pt-1">
            {daysOfWeek.map(d => {
              const isSelected = preferredDays.includes(d.num);
              return (
                <button
                  type="button"
                  key={d.num}
                  onClick={() => toggleDay(d.num)}
                  className={`flex-1 py-3 rounded-2xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-500 text-white border-blue-300 shadow-md scale-105'
                      : 'bg-blue-950/40 border-blue-400/15 text-blue-200/70 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mandatory Safety & Evidence-Based Disclaimers */}
        <div className="bg-amber-950/25 border border-amber-500/30 rounded-3xl p-5 space-y-3 text-xs text-amber-200/90 leading-relaxed shadow-md">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
            <ShieldAlert size={16} />
            <span>Safety &amp; Evidence-Based Guidelines</span>
          </div>

          <p>
            • <strong>Medical Consideration: </strong> FitPilot is designed for healthy movement guidance and does not substitute clinical medical advice. If you experience acute joint pain, dizziness, chest tightness, or shortness of breath, stop immediately and seek medical care.
          </p>
          <p>
            • <strong>Physiological Truth: </strong> Targeted spot fat reduction is biologically impossible. True body composition and metabolic health are governed by total energy balance, nutritious foods, sleep, and consistent weekly physical movement.
          </p>
        </div>

        {/* Submit Save */}
        <div className="flex items-center justify-between pt-2">
          {savedNotice ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Check size={15} />
              Profile updated successfully!
            </span>
          ) : (
            <span className="text-xs text-blue-300/70">
              Stored locally on this device
            </span>
          )}

          <button
            type="submit"
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Save size={14} />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
