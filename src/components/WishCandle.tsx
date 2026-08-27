import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Flame } from 'lucide-react';

export const WishCandle: React.FC = () => {
  const [isBlown, setIsBlown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBlowWish = () => {
    if (!isBlown) {
      setIsBlown(true);
    }
  };

  const handleRelight = () => {
    setIsBlown(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-6 sm:p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md text-center shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        className={`absolute inset-0 rounded-3xl transition-opacity duration-1000 pointer-events-none ${
          isBlown ? 'opacity-10 bg-black' : 'opacity-30 bg-red-800/20 blur-xl'
        }`}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans font-medium text-pink-200/70 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>A Moment of Magic</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-pink-50 font-light mb-2 tracking-tight">
          Make a Midnight Birthday Wish
        </h3>

        <p className="italic text-sm sm:text-base text-pink-100/70 max-w-md mx-auto mb-8 font-serif">
          Close your eyes, hold a secret wish deep in your heart, and tap the candle to seal it into the universe.
        </p>

        {/* The Candle Graphic */}
        <div
          onClick={handleBlowWish}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative cursor-pointer group flex flex-col items-center py-4 select-none"
        >
          {/* Flame & Glow */}
          {!isBlown ? (
            <motion.div
              animate={{
                scale: [1, 1.08, 0.95, 1.05, 1],
                y: [0, -2, 1, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="relative flex flex-col items-center mb-1"
            >
              {/* Giant ambient aura */}
              <div className="absolute -top-8 w-24 h-24 rounded-full bg-amber-400/30 filter blur-xl animate-pulse pointer-events-none" />

              {/* Outer Golden Flame */}
              <div className="w-7 h-12 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white filter drop-shadow-[0_0_16px_rgba(212,175,55,0.9)] relative">
                {/* Inner Core Flame */}
                <div className="absolute bottom-1 left-1.5 w-4 h-7 rounded-full bg-gradient-to-t from-red-500 via-amber-200 to-white" />
              </div>

              {/* Candle Wick */}
              <div className="w-1 h-3 bg-neutral-800 rounded-t-sm" />
            </motion.div>
          ) : (
            /* Smoke / Wish Released Effect */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center mb-4"
            >
              <div className="flex items-center gap-1.5 text-amber-200 text-xs italic animate-bounce font-serif">
                <Heart className="w-4 h-4 fill-red-500 text-pink-400" />
                <span>Wish sent to the stars! ✨</span>
              </div>
              <div className="w-1 h-3 bg-neutral-800 rounded-t-sm mt-1" />
            </motion.div>
          )}

          {/* Candle Pillar */}
          <div className="w-12 h-24 sm:w-14 sm:h-28 rounded-t-lg bg-gradient-to-r from-red-950 via-[#3b1010] to-red-950 border border-white/20 shadow-xl relative overflow-hidden">
            {/* Wax drips */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-red-700/60 rounded-b-xl" />
            <div className="absolute top-3 left-2 w-2 h-6 bg-red-600/40 rounded-full" />
            <div className="absolute top-2 right-3 w-1.5 h-8 bg-red-600/40 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>

          {/* Golden Candle Holder Base */}
          <div className="w-24 sm:w-28 h-5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-700 border border-amber-300/60 shadow-xl -mt-1" />
        </div>

        {/* Action Button */}
        <div className="mt-6">
          {!isBlown ? (
            <button
              onClick={handleBlowWish}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-300 to-amber-400 hover:from-amber-300 hover:to-rose-200 text-neutral-950 font-semibold text-xs sm:text-sm tracking-wide shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-neutral-950" />
              <span>Tap to Blow Out Candle & Make a Wish</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-pink-100 text-xs transition-all flex items-center gap-2"
            >
              <span>Relight the Candle 🕯️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
