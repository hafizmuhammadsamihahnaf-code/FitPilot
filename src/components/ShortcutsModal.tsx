import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Play / Pause workout timer' },
    { key: '→ (Right Arrow)', desc: 'Skip to next exercise or rest' },
    { key: '← (Left Arrow)', desc: 'Return to previous exercise' },
    { key: 'R', desc: 'Reset current exercise phase' },
    { key: 'M', desc: 'Toggle sound mute / unmute' },
    { key: 'Esc', desc: 'Close dialogs or view details' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/80 flex items-center justify-center p-4 backdrop-blur-md font-comic">
      <div className="bg-[#0c1830]/95 border border-blue-400/30 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 hover:text-white transition-colors border border-blue-400/20"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 text-white">
          <Keyboard size={18} className="text-blue-300" />
          <h3 className="text-base font-bold uppercase tracking-wider">
            Keyboard Shortcuts
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-blue-950/50 border border-blue-400/20"
            >
              <span className="px-2.5 py-1 rounded-xl bg-blue-900/60 font-mono font-bold text-white text-[11px] border border-blue-400/30">
                {s.key}
              </span>
              <span className="text-blue-200/80 text-right">{s.desc}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white font-bold text-xs rounded-2xl transition-all shadow-md active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
