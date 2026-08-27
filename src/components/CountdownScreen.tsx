import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Flame, Clock } from 'lucide-react';
import { TimeRemaining } from '../types';
import wreathImg from '../assets/images/romantic_rose_wreath_1787852882503.jpg';
import backdropImg from '../assets/images/romantic_floral_backdrop_1787852897841.jpg';

interface CountdownScreenProps {
  timeRemaining: TimeRemaining;
  onInstantReveal?: () => void;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({
  timeRemaining,
  onInstantReveal,
}) => {
  const [heartsCount, setHeartsCount] = useState(0);
  const [wishSparkle, setWishSparkle] = useState(false);

  const formatDigit = (num: number) => String(Math.max(0, num)).padStart(2, '0');

  const handleSendLove = () => {
    setHeartsCount((prev) => prev + 1);
    setWishSparkle(true);
    setTimeout(() => setWishSparkle(false), 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 sm:py-12 z-20 overflow-hidden select-none">
      {/* Luxurious Atmospheric Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src={backdropImg}
          alt="Romantic Floral Atmosphere"
          className="w-full h-full object-cover opacity-35 filter blur-[2px] scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft Radial Dark & Wine Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#140409]/80 to-[#0d0206]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140409]/60 via-transparent to-[#0d0206]/95" />
      </div>

      {/* Top Decorative Romantic Header / Candle Accent */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 flex flex-col items-center pt-2 sm:pt-4"
      >
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-pink-200 text-xs sm:text-sm tracking-[0.3em] uppercase font-sans">
          <Flame className="w-4 h-4 text-amber-400 animate-candle fill-amber-500/40" />
          <span className="tracking-[0.3em] uppercase text-pink-200/80 font-medium">
            August 28, 2026 &bull; Midnight PKT (UTC+5)
          </span>
          <Flame className="w-4 h-4 text-amber-400 animate-candle fill-amber-500/40" />
        </div>
      </motion.div>

      {/* Centerpiece Container */}
      <div className="relative z-20 w-full max-w-2xl mx-auto my-auto py-6 sm:py-8 flex flex-col items-center text-center">
        {/* Glowing Floral Wreath Frame Accent */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative mb-6 sm:mb-8"
        >
          {/* Subtle Ambient Glow Behind Frame */}
          <div className="absolute inset-0 rounded-full bg-red-600/15 filter blur-3xl scale-125 animate-pulse-slow pointer-events-none" />
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full p-1.5 border border-white/20 bg-white/5 shadow-2xl overflow-hidden group">
            <img
              src={wreathImg}
              alt="Romantic Floral Wreath"
              className="w-full h-full object-cover rounded-full filter saturate-125 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/40 via-transparent to-amber-400/20 rounded-full pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300 fill-rose-500/80 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Romantic Mystery Messages */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="space-y-3 sm:space-y-4 px-2"
        >
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#f5e6e8] leading-snug drop-shadow-md"
            style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.25)' }}
          >
            &ldquo;Someone incredibly special is about to arrive in your world...&rdquo;
          </h1>

          <p className="text-base sm:text-lg md:text-xl italic text-pink-100/80 max-w-xl mx-auto leading-relaxed">
            Stay close, my love. A little surprise made especially for you is waiting at midnight.{' '}
            <span className="inline-block text-red-500 filter drop-shadow">❤️</span>
          </p>
        </motion.div>

        {/* Elegant Large Countdown Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 sm:mt-10 w-full"
        >
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            {/* Days */}
            <div className="border border-white/20 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              <span
                className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight drop-shadow-lg"
                style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
              >
                {formatDigit(timeRemaining.days)}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans text-pink-200/70 mt-1.5">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="border border-white/20 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              <span
                className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight drop-shadow-lg"
                style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
              >
                {formatDigit(timeRemaining.hours)}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans text-pink-200/70 mt-1.5">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="border border-white/20 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              <span
                className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight drop-shadow-lg"
                style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
              >
                {formatDigit(timeRemaining.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans text-pink-200/70 mt-1.5">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="border border-white/20 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-rose-500/20 rounded-full blur-xl pointer-events-none" />
              <span className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-pink-100 drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                {formatDigit(timeRemaining.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans text-pink-200/70 mt-1.5">
                Seconds
              </span>
            </div>
          </div>

          {/* Subtitle Underneath */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2 text-pink-200/70 text-xs sm:text-sm font-light">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="tracking-[0.25em] uppercase text-[10px] font-sans font-medium text-pink-200/70">
                Reveal 12:00:00 AM PKT (UTC+5)
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <p className="italic text-sm sm:text-base text-pink-100/80 tracking-wide mt-1">
              &ldquo;Something beautiful is waiting for you...&rdquo;
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive Tap-to-Send-Love Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <button
            id="send-love-button"
            onClick={handleSendLove}
            className="group relative px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-pink-100 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95"
          >
            <Heart className="w-4 h-4 text-pink-300 fill-rose-500 group-hover:scale-125 transition-transform" />
            <span className="italic text-xs sm:text-sm font-serif">
              Tap to whisper love into the night
            </span>
            {heartsCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-rose-500/40 text-[11px] font-semibold text-rose-100">
                +{heartsCount}
              </span>
            )}
          </button>

          {wishSparkle && (
            <span className="text-xs text-amber-200/90 italic animate-fade-in">
              ✨ Your love echoes softly into the stars...
            </span>
          )}
        </motion.div>
      </div>

      {/* Subtle Bottom Note with Elegant Dark Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.3 }}
        className="relative z-20 text-center pb-2 flex flex-col items-center"
      >
        <div className="flex items-center justify-center space-x-4 opacity-50 mb-2">
          <div className="w-8 h-[1px] bg-pink-200" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-pink-200 font-sans">With all my love</span>
          <div className="w-8 h-[1px] bg-pink-200" />
        </div>
        <p className="text-xs italic text-pink-200/40">
          “And if you ever forget how special you are... remember someone is grateful that you exist.”
        </p>
      </motion.div>
    </div>
  );
};
