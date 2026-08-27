import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, Flame, Camera, Feather } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { MemoryLightbox } from './MemoryLightbox';
import { WishCandle } from './WishCandle';
import { LoveNotesSection } from './LoveNotesSection';

// Generated romantic assets
import wreathImg from '../assets/images/romantic_rose_wreath_1787852882503.jpg';
import backdropImg from '../assets/images/romantic_floral_backdrop_1787852897841.jpg';
import rosesCandleImg from '../assets/images/memory_roses_candle_1787852916138.jpg';
import starryLoveImg from '../assets/images/memory_starry_love_1787852933436.jpg';
import sunsetBeachImg from '../assets/images/memory_sunset_beach_1787852946329.jpg';
import loveLetterImg from '../assets/images/memory_love_letter_1787852961692.jpg';

const initialMemories: MemoryPhoto[] = [
  {
    id: 'mem-1',
    title: 'Velvet Roses & Candlelight',
    subtitle: 'Chapter I',
    imageSrc: rosesCandleImg,
    date: 'August 28',
    caption: 'Like the deepest red roses in full bloom, your presence fills every corner of my soul with beauty and grace.',
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'Under a Thousand Stars',
    subtitle: 'Chapter II',
    imageSrc: starryLoveImg,
    date: 'Forever & Always',
    caption: 'Even among billions of stars in the vast night sky, you will always be the only light that guides my heart home.',
    rotation: 2.5,
  },
  {
    id: 'mem-3',
    title: 'Golden Sunset Horizons',
    subtitle: 'Chapter III',
    imageSrc: sunsetBeachImg,
    date: 'Our Journey',
    caption: 'Walking hand in hand through all of life’s golden hours and quiet evenings with you is my greatest dream come true.',
    rotation: -1.5,
  },
  {
    id: 'mem-4',
    title: 'Words Written on My Heart',
    subtitle: 'Chapter IV',
    imageSrc: loveLetterImg,
    date: 'For Sidra',
    caption: 'Every love letter ever penned in history pales in comparison to the love and admiration I carry for you every single day.',
    rotation: 2,
  },
];

export const BirthdayScreen: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(initialMemories);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [sparkleCount, setSparkleCount] = useState(0);

  const handleUpdatePhoto = (updated: MemoryPhoto) => {
    setMemories((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPhoto(updated);
  };

  const handleHeartBurst = () => {
    setSparkleCount((c) => c + 1);
  };

  return (
    <div className="relative min-h-screen z-20 overflow-x-hidden text-rose-100 pb-20">
      {/* Luxurious Atmospheric Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src={backdropImg}
          alt="Romantic Birthday Background"
          className="w-full h-full object-cover opacity-30 filter blur-[2px] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#140409]/80 to-[#0d0206]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140409]/60 via-[#0d0206]/50 to-[#0d0206]" />
      </div>

      {/* =========================================================================
          HERO SECTION: "Happy Birthday, Sidra ❤️"
         ========================================================================= */}
      <section className="relative z-20 pt-12 sm:pt-20 pb-12 px-4 flex flex-col items-center text-center">
        {/* Soft Ambient Red/Gold Glow Behind Hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-red-600/10 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />

        {/* Floral Wreath Centerpiece */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full p-2 border border-white/20 bg-white/5 shadow-2xl overflow-hidden relative group">
            <img
              src={wreathImg}
              alt="Rose Wreath"
              className="w-full h-full object-cover rounded-full filter saturate-125 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-950/40 via-transparent to-amber-300/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-9 h-9 sm:w-12 sm:h-12 text-pink-300 fill-red-500/90 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)] animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Main Heading & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.4em] uppercase text-pink-200 opacity-70 font-sans">
            August 28, 2026
          </div>

          <div className="relative mb-2">
            <div className="absolute -inset-8 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />
            <h1
              className="text-4xl sm:text-7xl md:text-8xl font-light tracking-tight leading-tight mb-4"
              style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
            >
              Happy Birthday,{' '}
              <span style={{ color: '#d4af37' }}>Sidra</span>{' '}
              <span className="text-red-500 inline-block filter drop-shadow">❤️</span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl italic text-pink-100 opacity-80 mb-6">
            To the most beautiful and special person in my world.
          </p>

          <div className="max-w-2xl mx-auto text-center leading-relaxed text-sm sm:text-base tracking-wide text-pink-50/70 font-sans font-light">
            <p className="mb-3">
              Today is more than just your birthday. It is a celebration of the beautiful person who makes my world brighter simply by being in it. You are one of the most precious gifts life has given me.
            </p>
            <p>
              May you always smile the way you make me smile. Today, tomorrow, and every day, you deserve to know just how special you are.
            </p>
          </div>
        </motion.div>

        {/* Decorative Golden Rose Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="flex items-center justify-center gap-4 my-8 max-w-md w-full"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-pink-200/50" />
          <Heart className="w-3.5 h-3.5 fill-red-500 text-pink-400" />
          <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
          <Heart className="w-3.5 h-3.5 fill-red-500 text-pink-400" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/20 to-pink-200/50" />
        </motion.div>
      </section>

      {/* =========================================================================
          ROMANTIC LOVE LETTER CARD
         ========================================================================= */}
      <section className="relative z-20 max-w-3xl mx-auto px-4 my-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="border border-white/20 bg-white/5 backdrop-blur-md rounded-3xl p-7 sm:p-12 shadow-2xl relative overflow-hidden group"
        >
          {/* Wax Seal & Feather Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-sans uppercase tracking-[0.3em] font-medium">
              <Feather className="w-4 h-4 text-amber-300" />
              <span>A Letter From My Soul</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] tracking-widest text-pink-200/60 font-sans uppercase">
              <span>August 28, 2026</span>
            </div>
          </div>

          {/* Letter Body - Heartfelt Content */}
          <div className="space-y-6 text-pink-50 leading-relaxed font-garamond text-lg sm:text-2xl">
            <p
              className="text-xl sm:text-3xl font-light tracking-wide"
              style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.25)' }}
            >
              Happy Birthday, my love, Sidra.{' '}
              <span className="inline-block text-red-500">❤️</span>
            </p>

            <p className="text-pink-100/90 font-light">
              Today is more than just your birthday. It is a celebration of the beautiful person who makes my world brighter simply by being in it.
            </p>

            <p className="text-pink-100/90 font-light">
              You are one of the most precious gifts life has given me, and I hope this new year of your life brings you endless happiness, beautiful moments, peaceful days, and everything your heart wishes for.
            </p>

            <p className="text-amber-100 font-normal italic">
              May you always smile the way you make me smile.
            </p>

            <p className="text-pink-100/90 font-light">
              Happy Birthday to my beautiful Sidra.{' '}
              <span className="inline-block text-red-500">❤️</span>
            </p>

            <p className="text-pink-200/80 italic pt-2">
              Today, tomorrow, and every day, you deserve to know just how special you are.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-red-500 text-pink-400 animate-pulse" />
              <span className="font-script text-3xl sm:text-4xl text-gold-gradient">
                Forever &amp; Always Yours
              </span>
            </div>

            <button
              onClick={handleHeartBurst}
              className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-pink-100 text-xs transition-all flex items-center gap-2 active:scale-95 shadow-md"
            >
              <Heart className="w-3.5 h-3.5 fill-red-500 text-pink-400" />
              <span className="tracking-wide">Send Heartbeat</span>
              {sparkleCount > 0 && <span className="text-amber-300">({sparkleCount})</span>}
            </button>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          PHOTO / MEMORY SECTION: "A Little Corner of My Heart ❤️"
         ========================================================================= */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 sm:px-12 my-16 sm:my-24">
        {/* Section Header Matching Elegant Dark Design */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-pink-200/50 font-sans">
              Memories
            </h3>
            <p className="text-xl sm:text-2xl italic text-pink-100 font-serif">
              A Little Corner of My Heart <span className="text-red-500">❤️</span>
            </p>
          </div>
          <div className="h-[1px] flex-1 bg-white/10 mx-6 sm:mx-8 mb-2"></div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-pink-200/50 font-sans">
            Reveal 00:00:00
          </div>
        </div>

        {/* Elegant Cream Polaroid Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {memories.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.04, rotate: 0 }}
              style={{ rotate: `${photo.rotation}deg` }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group relative w-full max-w-[260px] bg-[#fdfaf5] p-3.5 shadow-2xl flex flex-col transform transition-transform duration-300"
            >
              {/* Inner Neutral Photo Frame */}
              <div className="relative aspect-4/3 sm:aspect-square bg-neutral-200 overflow-hidden shadow-inner">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                  <span className="text-[10px] text-white uppercase tracking-widest italic font-sans px-2 py-1 bg-black/50 rounded-full">
                    View Moment
                  </span>
                </div>
              </div>

              {/* Polaroid Bottom Note */}
              <div className="pt-3 pb-1 text-center font-sans">
                <div className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium">
                  {photo.subtitle}
                </div>
                <div className="text-neutral-800 text-xs sm:text-sm italic font-serif font-medium mt-0.5">
                  {photo.title}
                </div>
                <div className="text-[10px] text-neutral-500 font-sans tracking-wide mt-0.5">
                  {photo.date || 'Forever ❤️'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE WISH CANDLE SECTION
         ========================================================================= */}
      <section className="relative z-20 px-4">
        <WishCandle />
      </section>

      {/* =========================================================================
          LITTLE LOVE LETTERS / REASONS
         ========================================================================= */}
      <section className="relative z-20">
        <LoveNotesSection />
      </section>

      {/* =========================================================================
          SPECIAL FINAL MESSAGE SECTION & FOOTER
         ========================================================================= */}
      <section className="relative z-20 max-w-3xl mx-auto px-4 my-16 sm:my-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="border border-white/20 bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glowing center heart */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-300 fill-red-500 mx-auto animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />

            <h3 className="font-serif text-xl sm:text-3xl text-pink-100 font-light tracking-wide">
              &ldquo;And if you ever forget how special you are...&rdquo;
            </h3>

            <p
              className="font-garamond italic text-2xl sm:text-4xl font-normal leading-relaxed max-w-xl mx-auto py-2"
              style={{ color: '#d4af37', textShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
            >
              &ldquo;Come back here and remember that somewhere in this world, someone is incredibly grateful that you exist.{' '}
              <span className="inline-block text-red-500">❤️</span>&rdquo;
            </p>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl text-pink-50 font-light tracking-tight">
                Happy Birthday, Sidra.
              </h2>
              <div className="flex items-center justify-center space-x-4 opacity-70 pt-4">
                <div className="w-8 h-[1px] bg-pink-200" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-pink-200 font-sans">With all my love</span>
                <div className="w-8 h-[1px] bg-pink-200" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Elegant Dark Bottom Footer */}
      <footer className="w-full text-center px-6 z-10 my-8">
        <div className="flex items-center justify-center space-x-4 opacity-50 mb-2">
          <div className="w-8 h-[1px] bg-pink-200"></div>
          <span className="text-[10px] tracking-[0.4em] uppercase font-sans text-pink-200">With all my love</span>
          <div className="w-8 h-[1px] bg-pink-200"></div>
        </div>
        <p className="text-xs italic text-pink-200/40 font-serif">
          “And if you ever forget how special you are... remember someone is grateful that you exist.”
        </p>
      </footer>

      {/* Lightbox Modal */}
      <MemoryLightbox
        photo={selectedPhoto}
        photos={memories}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
        onUpdatePhoto={handleUpdatePhoto}
      />
    </div>
  );
};
