import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimeRemaining } from './types';
import { RomanticCanvas } from './components/RomanticCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { CountdownScreen } from './components/CountdownScreen';
import { MidnightTransition } from './components/MidnightTransition';
import { BirthdayScreen } from './components/BirthdayScreen';
import { ModeTester } from './components/ModeTester';

// Fixed target: August 28, 2026 at 12:00:00 AM Pakistan Standard Time (UTC+5)
// In UTC: August 27, 2026 at 19:00:00 UTC (19:00 UTC + 5 hours = 00:00 PKT)
const TARGET_TIMESTAMP_PKT = Date.UTC(2026, 7, 27, 19, 0, 0);

export default function App() {
  const calculateTimeRemaining = useCallback((): TimeRemaining => {
    const now = Date.now();
    const diff = TARGET_TIMESTAMP_PKT - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
        isMidnightReached: true,
      };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      totalMilliseconds: diff,
      isMidnightReached: false,
    };
  }, []);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [manualModeOverride, setManualModeOverride] = useState<'countdown' | 'celebration' | null>(null);

  // Active state determination:
  // If someone opens the website after August 28, 2026 12:00 AM PKT,
  // timeRemaining.isMidnightReached is immediately true, revealing the celebration.
  const isCelebrationActive = manualModeOverride !== null
    ? manualModeOverride === 'celebration'
    : timeRemaining.isMidnightReached;

  // Real-time clock tick: automatically triggers midnight reveal when countdown reaches zero
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining((prev) => {
        // If it crosses midnight live in front of Sidra's eyes, trigger the reveal transition automatically
        if (!prev.isMidnightReached && remaining.isMidnightReached && manualModeOverride === null) {
          setIsTransitioning(true);
        }
        return remaining;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining, manualModeOverride]);

  const handleTriggerManualTransition = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setManualModeOverride('celebration');
  };

  return (
    <main
      className="relative min-h-screen text-[#f5e6e8] selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden font-serif"
      style={{
        background: 'radial-gradient(circle at center, #2d0a0a 0%, #120505 100%)',
      }}
    >
      {/* Elegant Dark Ambient Light Blurs */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-200 rounded-full blur-[1px]" />
        <div className="absolute top-20 right-40 w-3 h-3 bg-red-400 rounded-full blur-[2px] opacity-60" />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-yellow-200 rounded-full blur-[3px] opacity-30" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-pink-300 rounded-full blur-[1px]" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20px] left-[15%] w-24 h-24 bg-red-800 opacity-20 rounded-full blur-2xl" />
        <div className="absolute bottom-[-10px] right-[10%] w-32 h-32 bg-pink-900 opacity-15 rounded-full blur-3xl" />
      </div>

      {/* 60 FPS Particle Canvas (Rose Petals, Golden Stardust, Floating Hearts) */}
      <RomanticCanvas isCelebration={isCelebrationActive} />

      {/* Floating Audio Soundtrack Controller */}
      <AudioPlayer />

      {/* Mode / Preview Switcher for Testing */}
      <ModeTester
        currentMode={isCelebrationActive ? 'celebration' : 'countdown'}
        onSetMode={(mode) => setManualModeOverride(mode)}
        onTriggerTransition={handleTriggerManualTransition}
      />

      {/* Main Experience Router with AnimatePresence */}
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <MidnightTransition key="transition" onComplete={handleTransitionComplete} />
        ) : !isCelebrationActive ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
          >
            <CountdownScreen
              timeRemaining={timeRemaining}
              onInstantReveal={handleTriggerManualTransition}
            />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <BirthdayScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

