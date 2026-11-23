import React, { useState } from 'react';
import { X, Play, ShieldAlert, CheckCircle, Wind, AlertTriangle, Eye } from 'lucide-react';
import { Exercise } from '../types';
import { ExerciseVisual } from './ExerciseVisual';

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  onStartExercise: (exercise: Exercise) => void;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  onClose,
  onStartExercise
}) => {
  const [activeTab, setActiveTab] = useState<'bengali' | 'english'>('bengali');

  if (!exercise) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-blue-950/85 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xl animate-fadeIn font-comic select-none overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#09142e]/95 border border-blue-400/30 rounded-3xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-[0_8px_32px_rgba(2,6,23,0.85)] relative my-auto max-h-[92vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button & language toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bengali')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bengali'
                  ? 'bg-blue-600 text-white shadow-sm border border-blue-400/40'
                  : 'bg-blue-950/50 text-blue-300 hover:text-white border border-blue-400/20'
              }`}
            >
              বাংলা বিবরণ
            </button>
            <button
              onClick={() => setActiveTab('english')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'english'
                  ? 'bg-blue-600 text-white shadow-sm border border-blue-400/40'
                  : 'bg-blue-950/50 text-blue-300 hover:text-white border border-blue-400/20'
              }`}
            >
              English Guide
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 text-blue-300 hover:text-white transition-colors border border-blue-400/25 active:scale-95"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Header Titles */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-950/70 text-blue-200 border border-blue-400/25">
              {exercise.category.replace('_', ' ')}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-200 font-bold border border-blue-400/30">
              {exercise.difficulty}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-800/40 text-blue-100 font-bold border border-blue-400/20">
              {exercise.reps || `${exercise.durationSeconds}s`}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {exercise.bengaliName || exercise.name}
          </h2>
          {exercise.bengaliName && (
            <p className="text-xs text-blue-300/80 mt-0.5 font-medium">
              {exercise.name}
            </p>
          )}

          <div className="text-xs text-blue-300/70 mt-1">
            পেশির লক্ষ্য: <span className="text-blue-100">{exercise.targetMuscles.join(', ')}</span>
          </div>
        </div>

        {/* Animated Exercise Visual Demonstration */}
        <div className="rounded-2xl overflow-hidden border border-blue-400/25 bg-[#060e22]/90 shadow-inner">
          <div className="px-3 py-1.5 bg-blue-950/80 border-b border-blue-400/15 flex items-center justify-between text-[11px] text-blue-200">
            <span className="flex items-center gap-1.5 font-bold">
              <Eye size={13} className="text-blue-400" />
              অ্যানিমেটেড ভিশ্যুয়াল ডেমো (Animated Form Guide)
            </span>
            <span className="text-[10px] text-blue-300/60 font-mono">
              Looping Animation
            </span>
          </div>
          <div className="p-2 flex justify-center">
            <ExerciseVisual 
              exerciseId={exercise.id}
              animationType={exercise.animationType}
              className="max-w-md w-full"
            />
          </div>
        </div>

        {/* Content based on selected tab */}
        {activeTab === 'bengali' ? (
          <div className="space-y-3.5 text-xs">
            {/* Purpose */}
            {exercise.bengaliPurpose && (
              <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-400/25 leading-relaxed">
                <span className="font-bold text-blue-200 block mb-1">
                  ব্যায়ামের উদ্দেশ্য ও উপকারিতা:
                </span>
                <p className="text-blue-100/90 leading-relaxed font-normal">
                  {exercise.bengaliPurpose}
                </p>
              </div>
            )}

            {/* How to do it step by step */}
            {exercise.bengaliHowTo && exercise.bengaliHowTo.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-blue-950/50 border border-blue-400/25 space-y-2">
                <span className="font-bold text-white block text-sm">
                  কীভাবে করবেন (ধাপে ধাপে বিবরণ):
                </span>
                <ol className="space-y-1.5 text-blue-100/90 list-decimal list-inside leading-relaxed">
                  {exercise.bengaliHowTo.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="text-blue-100">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Form cues */}
            {exercise.bengaliFormCues && exercise.bengaliFormCues.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-400/20 space-y-1.5">
                <span className="font-bold text-blue-200 block">
                  সঠিক ফর্ম ও সতর্কতার নিয়ম:
                </span>
                <div className="space-y-1">
                  {exercise.bengaliFormCues.map((cue, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-blue-100/90">
                      <CheckCircle size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{cue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Breathing instructions */}
            {exercise.bengaliBreathing && (
              <div className="p-3 rounded-2xl bg-blue-900/30 border border-blue-400/20 flex items-start gap-2.5 text-blue-100">
                <Wind size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-200 block text-[11px] mb-0.5">
                    শ্বাস-প্রশ্বাসের সঠিক নিয়ম:
                  </span>
                  <p className="text-xs text-blue-100/90 leading-relaxed">
                    {exercise.bengaliBreathing}
                  </p>
                </div>
              </div>
            )}

            {/* Mistakes to avoid */}
            {exercise.bengaliMistakes && exercise.bengaliMistakes.length > 0 && (
              <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-400/20 space-y-1 text-blue-200">
                <span className="font-bold text-blue-300 flex items-center gap-1.5 text-[11px]">
                  <AlertTriangle size={13} className="text-blue-400" />
                  যে সাধারণ ভুলগুলো পরিহার করবেন:
                </span>
                <ul className="space-y-1 text-blue-100/80 list-disc list-inside">
                  {exercise.bengaliMistakes.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Scaled variation & Safety */}
            <div className="space-y-2">
              {exercise.bengaliVariation && (
                <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-400/20">
                  <span className="font-bold text-blue-200 block mb-0.5 text-[11px]">
                    সহজ বা বিকল্প পদ্ধতি:
                  </span>
                  <p className="text-blue-100/90 leading-relaxed">{exercise.bengaliVariation}</p>
                </div>
              )}

              {exercise.bengaliSafetyNote && (
                <div className="p-3 rounded-2xl bg-blue-950/70 border border-blue-400/30 text-blue-100">
                  <span className="font-bold text-blue-300 flex items-center gap-1.5 mb-0.5 text-[11px]">
                    <ShieldAlert size={14} className="text-blue-400" />
                    জয়েন্ট ও মেরুদণ্ডের সুরক্ষা নোট:
                  </span>
                  <p className="leading-relaxed text-blue-100/90">{exercise.bengaliSafetyNote}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 text-xs">
            {/* English Purpose */}
            <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-400/25 text-xs leading-relaxed">
              <span className="font-bold text-blue-200 block mb-1">
                Biomechanical Purpose:
              </span>
              <p className="text-blue-100/90">{exercise.purpose}</p>
            </div>

            {/* English Form Cues */}
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-400/20 space-y-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block text-[11px]">
                Execution &amp; Form Cues
              </span>
              <div className="space-y-1.5">
                {exercise.formCues.map((cue, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-blue-200/90">
                    <CheckCircle size={14} className="text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{cue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* English Variations & Safety */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-blue-950/50 border border-blue-400/20">
                <span className="font-bold text-blue-200 block mb-0.5">
                  Easier / Scaled Variation:
                </span>
                <p className="text-blue-100/80">{exercise.easierVariation}</p>
              </div>

              <div className="p-3 rounded-2xl bg-blue-950/70 border border-blue-400/30 text-blue-100">
                <span className="font-bold text-blue-300 flex items-center gap-1.5 mb-0.5">
                  <ShieldAlert size={14} className="text-blue-400" />
                  Safety &amp; Joint Comfort Note:
                </span>
                <p className="leading-relaxed">{exercise.stopSafetyNote}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-blue-400/20">
          <div className="text-xs font-bold text-blue-200">
            লক্ষ্য: {exercise.reps || `${exercise.durationSeconds}s`}
          </div>

          <button
            onClick={() => {
              onClose();
              onStartExercise(exercise);
            }}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.4)] active:scale-95 border border-blue-400/30"
          >
            <Play size={13} fill="currentColor" />
            <span>এই ব্যায়ামের টাইমার চালু করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
