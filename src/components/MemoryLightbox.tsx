import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, Camera } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface MemoryLightboxProps {
  photo: MemoryPhoto | null;
  photos: MemoryPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: MemoryPhoto) => void;
  onUpdatePhoto: (updated: MemoryPhoto) => void;
}

export const MemoryLightbox: React.FC<MemoryLightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
  onUpdatePhoto,
}) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdatePhoto({
            ...photo,
            imageSrc: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="memory-lightbox-modal"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg"
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous memory"
          className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-white/10 border border-white/20 text-pink-200 hover:text-white hover:bg-white/20 transition-all shadow-xl backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next memory"
          className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-white/10 border border-white/20 text-pink-200 hover:text-white hover:bg-white/20 transition-all shadow-xl backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 border border-white/20 text-pink-200 hover:text-white transition-all shadow-xl backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Card Content - Cream Polaroid Framing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-xl w-full bg-[#fdfaf5] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col items-center border border-white/40"
        >
          {/* Main Photo View */}
          <div className="relative w-full aspect-4/3 sm:aspect-square bg-neutral-200 rounded-xl overflow-hidden shadow-inner group">
            <img
              src={photo.imageSrc}
              alt={photo.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Custom Photo Replace Button */}
            <label className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/30 text-white text-xs font-medium cursor-pointer backdrop-blur-md flex items-center gap-1.5 transition-all">
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Replace with our photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Details & Romantic Caption */}
          <div className="w-full mt-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-sans">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-neutral-400 text-[10px] tracking-widest uppercase font-medium">
                <Heart className="w-3 h-3 fill-red-500 text-pink-400" />
                <span>{photo.subtitle}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-neutral-800 font-medium mt-0.5">
                {photo.title}
              </h3>
            </div>

            {photo.date && (
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-sans">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
              </div>
            )}
          </div>

          <p className="w-full font-serif italic text-sm sm:text-base text-neutral-600 mt-2.5 pt-2.5 border-t border-neutral-200 leading-relaxed text-center sm:text-left">
            &ldquo;{photo.caption}&rdquo;
          </p>

          <div className="mt-3 text-[10px] text-neutral-400 font-sans">
            {currentIndex + 1} of {photos.length} memories &bull; Tap outside to close
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
