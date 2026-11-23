import React from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface SafetyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStopWorkout?: () => void;
}

export const SafetyAlertModal: React.FC<SafetyAlertModalProps> = ({
  isOpen,
  onClose,
  onStopWorkout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/80 flex items-center justify-center p-4 backdrop-blur-md font-comic">
      <div className="bg-[#0c1830]/95 border border-amber-400/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 hover:text-white transition-colors border border-blue-400/20"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
            <ShieldAlert size={26} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Safety &amp; Medical Protocol
            </h3>
            <span className="text-xs text-amber-300 font-bold">
              Listen to your body first, always.
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs text-blue-100 leading-relaxed">
          <p>
            FitPilot provides structured physical training guidance. It is <strong className="text-white font-bold">not a physician or diagnostic tool</strong>.
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200/90 space-y-2">
            <div className="font-bold text-amber-300">
              Stop immediately if you experience:
            </div>
            <ul className="space-y-1 list-disc pl-4 text-[11px]">
              <li>Chest pressure, tightness, or radiating arm/jaw discomfort</li>
              <li>Sudden dizziness, vertigo, or lightheadedness</li>
              <li>Unusual or severe shortness of breath</li>
              <li>Fainting, nausea, or clammy cold sweats</li>
              <li>Acute, sharp joint pain or muscle tearing sensations</li>
            </ul>
          </div>

          <p className="text-[11px] text-blue-300/70">
            If any of the above symptoms occur, sit or lie down, rest, and seek emergency or clinical medical evaluation.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-400/20">
          {onStopWorkout && (
            <button
              onClick={() => {
                onStopWorkout();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-400/30 text-red-200 text-xs font-bold transition-colors"
            >
              Stop Current Workout
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white text-xs font-bold transition-all shadow-md"
          >
            I Understand &amp; Feel Good
          </button>
        </div>
      </div>
    </div>
  );
};
