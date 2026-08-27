import React, { useState } from 'react';
import { Sparkles, Clock, PartyPopper, Eye, Play } from 'lucide-react';

interface ModeTesterProps {
  currentMode: 'countdown' | 'celebration';
  onSetMode: (mode: 'countdown' | 'celebration') => void;
  onTriggerTransition: () => void;
}

export const ModeTester: React.FC<ModeTesterProps> = ({
  currentMode,
  onSetMode,
  onTriggerTransition,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-pink-200 hover:text-white text-[11px] font-sans backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5"
          title="Preview and test midnight transition"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Preview Controls</span>
        </button>
      ) : (
        <div className="p-3.5 rounded-2xl border border-white/20 bg-[#1e0709]/95 shadow-2xl backdrop-blur-xl flex flex-col gap-2 min-w-[220px] animate-fade-in font-sans">
          <div className="flex items-center justify-between text-[10px] text-pink-200/70 font-medium uppercase tracking-[0.2em] pb-1 border-b border-white/10">
            <span>Experience Preview</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-pink-200 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5 text-xs">
            <button
              onClick={() => {
                onSetMode('countdown');
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                currentMode === 'countdown'
                  ? 'bg-white/15 text-white font-medium border border-white/20'
                  : 'text-pink-200/80 hover:bg-white/5'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Before Midnight Screen</span>
            </button>

            <button
              onClick={() => {
                onTriggerTransition();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-amber-200 hover:bg-white/10 border border-amber-400/30 hover:border-amber-300/60 transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Play Midnight Reveal (FX)</span>
            </button>

            <button
              onClick={() => {
                onSetMode('celebration');
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                currentMode === 'celebration'
                  ? 'bg-white/15 text-white font-medium border border-white/20'
                  : 'text-pink-200/80 hover:bg-white/5'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5 text-pink-300" />
              <span>Full Birthday Celebration</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
