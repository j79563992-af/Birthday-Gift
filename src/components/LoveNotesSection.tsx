import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, MailOpen, X } from 'lucide-react';
import { LoveNote } from '../types';

const loveNotesData: LoveNote[] = [
  {
    id: 1,
    title: 'Your Radiant Smile',
    message:
      'The way your entire face lights up whenever you smile has the magical power to turn my heaviest days into absolute sunshine.',
  },
  {
    id: 2,
    title: 'Your Gentle Heart',
    message:
      'The pure kindness, grace, and tenderness you give to everyone around you is something so rare and precious in this world.',
  },
  {
    id: 3,
    title: 'The Sparkle in Your Eyes',
    message:
      'Every time I look into your eyes, I see my home, my peace, and my favorite future.',
  },
  {
    id: 4,
    title: 'Our Quiet Moments',
    message:
      'Just sitting beside you in comfortable silence, listening to the world go by, is more peaceful than anywhere else on earth.',
  },
  {
    id: 5,
    title: 'Your Contagious Laugh',
    message:
      'Your laughter is the sweetest melody I have ever heard, and making you laugh will always be my greatest joy.',
  },
  {
    id: 6,
    title: 'The Way You Love',
    message:
      'You love so deeply, sincerely, and unconditionally. Being loved by you is the greatest honor of my lifetime.',
  },
];

export const LoveNotesSection: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);
  const [openedNoteIds, setOpenedNoteIds] = useState<number[]>([]);

  const handleOpenNote = (note: LoveNote) => {
    setSelectedNote(note);
    if (!openedNoteIds.includes(note.id)) {
      setOpenedNoteIds((prev) => [...prev, note.id]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-pink-200 text-xs uppercase tracking-[0.3em] font-sans font-medium mb-3">
          <Heart className="w-3.5 h-3.5 fill-red-500 text-pink-400" />
          <span>Little Love Letters</span>
          <Heart className="w-3.5 h-3.5 fill-red-500 text-pink-400" />
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl text-pink-50 font-light tracking-wide">
          Treasures of My Heart
        </h2>
        <p className="italic text-base sm:text-lg text-pink-200/70 max-w-md mx-auto mt-2 font-serif">
          Tap each sealed letter to unwrap a little secret of why you mean the universe to me.
        </p>
      </div>

      {/* Grid of Sealed Letters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {loveNotesData.map((note) => {
          const isOpened = openedNoteIds.includes(note.id);
          return (
            <motion.div
              key={note.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenNote(note)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group shadow-xl ${
                isOpened
                  ? 'border-white/15 bg-white/5 backdrop-blur-md'
                  : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-amber-400/50 backdrop-blur-md'
              }`}
            >
              {/* Decorative Wax Seal / Envelope Icon */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                    isOpened
                      ? 'bg-white/10 text-pink-200'
                      : 'bg-gradient-to-tr from-[#881337] to-[#3b1010] text-pink-100 group-hover:rotate-12 border border-white/20'
                  }`}
                >
                  {isOpened ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                </div>

                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-pink-200/60 font-medium">
                  Letter #{note.id}
                </span>
              </div>

              <h4 className="font-serif text-lg text-pink-100 font-light group-hover:text-amber-200 transition-colors">
                {note.title}
              </h4>

              <p className="italic text-xs sm:text-sm text-pink-200/70 mt-2 line-clamp-2 font-serif">
                {isOpened ? note.message : 'Sealed with love & rose wax...'}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-pink-200/60 group-hover:text-pink-100 font-sans">
                <span>{isOpened ? 'Read again' : 'Tap to break seal'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:animate-spin" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Note Detail Modal */}
      <AnimatePresence>
        {selectedNote && (
          <div
            onClick={() => setSelectedNote(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full border border-white/20 bg-[#1e0709]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedNote(null)}
                aria-label="Close letter"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-pink-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-amber-300 text-xs tracking-widest uppercase font-sans font-medium mb-2">
                <Heart className="w-4 h-4 fill-red-500 text-pink-400" />
                <span>To My Beloved Sidra</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-pink-50 font-light mb-4">
                {selectedNote.title}
              </h3>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 my-4 shadow-inner">
                <p className="font-garamond italic text-lg sm:text-xl text-pink-100 leading-relaxed">
                  &ldquo;{selectedNote.message}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 text-xs text-pink-200/80 font-sans">
                <span className="font-script text-2xl text-amber-200 font-normal">With all my love ❤️</span>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs text-pink-100 transition-all font-medium"
                >
                  Keep in Heart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

