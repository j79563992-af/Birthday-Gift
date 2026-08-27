import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface MidnightTransitionProps {
  onComplete: () => void;
}

export const MidnightTransition: React.FC<MidnightTransitionProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'initial' | 'burst' | 'reveal' | 'finished'>('initial');

  useEffect(() => {
    // Attempt starting romantic background melody during transition
    romanticAudio.start().catch(() => {});

    const timer1 = setTimeout(() => setStage('burst'), 800);
    const timer2 = setTimeout(() => setStage('reveal'), 2600);
    const timer3 = setTimeout(() => {
      setStage('finished');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0d0206] select-none">
      {/* Background radial expansion glow */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{
          scale: stage === 'burst' || stage === 'reveal' ? [1, 2.5, 4] : 1,
          opacity: stage === 'burst' || stage === 'reveal' ? [0.2, 0.8, 0.4] : 0,
        }}
        transition={{ duration: 3.5, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full bg-radial from-rose-500/40 via-amber-400/20 to-transparent blur-3xl pointer-events-none"
      />

      {/* Floating Sparkle Rings */}
      <motion.div
        initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
        animate={{
          rotate: 360,
          scale: stage === 'reveal' ? 1.5 : 1,
          opacity: stage === 'burst' || stage === 'reveal' ? 1 : 0,
        }}
        transition={{ duration: 4, ease: 'easeOut' }}
        className="absolute w-96 h-96 rounded-full border border-amber-300/30 border-dashed pointer-events-none"
      />

      {/* Center Cinematic Message */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-6 relative"
        >
          <div className="absolute inset-0 bg-rose-500/50 rounded-full blur-2xl animate-pulse" />
          <div className="relative p-6 rounded-full glass-romantic-gold border border-amber-400/50 shadow-2xl">
            <Heart className="w-16 h-16 text-rose-300 fill-rose-500 animate-pulse drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-amber-300 text-xs tracking-widest uppercase font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Midnight Has Arrived</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-rose-100 font-bold tracking-wide">
            Happy Birthday, My Love
          </h2>

          <p className="font-script text-3xl sm:text-4xl text-gold-gradient py-1">
            Sidra
          </p>

          <p className="font-garamond italic text-base sm:text-lg text-rose-200/90 max-w-sm mx-auto">
            Opening a little magical world crafted just for you...
          </p>
        </motion.div>
      </div>
    </div>
  );
};
