import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Heart, Sparkles, Upload, Link as LinkIcon, Disc3 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [currentSourceName, setCurrentSourceName] = useState('Romantic Music Box & Piano');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const togglePlayback = async () => {
    await romanticAudio.toggle();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      romanticAudio.setCustomAudioUrl(objectUrl);
      setCurrentSourceName(file.name.replace(/\.[^/.]+$/, ''));
      setIsModalOpen(false);
      romanticAudio.start();
    }
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      romanticAudio.setCustomAudioUrl(customUrl.trim());
      setCurrentSourceName('Custom Audio Track');
      setIsModalOpen(false);
      romanticAudio.start();
    }
  };

  const handleResetToSynthesizer = () => {
    romanticAudio.setCustomAudioUrl('');
    setCurrentSourceName('Romantic Music Box & Piano');
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Audio Pill */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          id="play-music-button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
          className={`group flex items-center gap-3 px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 shadow-xl border backdrop-blur-md ${
            isPlaying
              ? 'bg-white/15 border-white/30 text-pink-100 shadow-rose-950/60 ring-1 ring-amber-400/30'
              : 'border-white/20 bg-white/5 hover:bg-white/10 text-pink-200/90'
          }`}
        >
          {isPlaying ? (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm">♪</span>
            </div>
          ) : (
            <span className="text-sm text-pink-200 group-hover:scale-110 transition-transform">♪</span>
          )}

          <span className="text-[10px] tracking-widest uppercase font-sans">
            {isPlaying ? 'Playing Our Moment' : 'Play Our Moment'}
          </span>

          {/* Animated sound bars */}
          {isPlaying && (
            <div className="flex items-center gap-0.5 ml-1 h-3">
              <span className="w-0.5 h-3 bg-pink-200 rounded-full animate-[bounce_1s_infinite_100ms]"></span>
              <span className="w-0.5 h-2 bg-pink-300 rounded-full animate-[bounce_1s_infinite_300ms]"></span>
              <span className="w-0.5 h-3.5 bg-pink-200 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
              <span className="w-0.5 h-1.5 bg-pink-300 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
            </div>
          )}
        </button>

        {/* Change Track / Settings Trigger */}
        <button
          id="music-settings-button"
          onClick={() => setIsModalOpen(true)}
          title="Change or upload background music"
          className="p-2.5 rounded-full bg-white/5 border border-white/20 text-pink-200/80 hover:text-white hover:bg-white/15 backdrop-blur-md transition-all shadow-lg"
        >
          <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
      </div>

      {/* Audio Customization Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-romantic-gold w-full max-w-md p-6 rounded-2xl border border-rose-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-rose-900/40 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-serif-luxury text-lg text-rose-100 font-semibold tracking-wide">
                  Romantic Soundtrack
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-rose-300/70 hover:text-white text-lg px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-rose-200/80 font-light mb-5 leading-relaxed">
              Enjoy the warm romantic music box melody, or personalize it with your own favorite song for Sidra.
            </p>

            <div className="space-y-4">
              {/* Current Track Info */}
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-amber-300/80 font-medium">Currently Selected</div>
                  <div className="text-xs text-rose-100 font-medium truncate max-w-[240px] mt-0.5">{currentSourceName}</div>
                </div>
                <button
                  onClick={handleResetToSynthesizer}
                  className="text-[11px] text-amber-300 hover:text-amber-200 underline font-medium"
                >
                  Use Original
                </button>
              </div>

              {/* Upload Personal MP3 */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-900/30 hover:bg-rose-900/50 border border-rose-700/40 text-rose-200 hover:text-white text-xs font-medium transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-rose-400" />
                  Upload Personal Song (MP3 / Audio)
                </button>
              </div>

              {/* Or Direct Audio Link */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-rose-300/70 font-medium flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" /> Or Enter Direct Audio URL (.mp3)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/our-song.mp3"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 bg-black/50 border border-rose-900/50 rounded-xl px-3 py-2 text-xs text-rose-100 placeholder:text-rose-400/30 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium shadow-md transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-full bg-rose-950/70 hover:bg-rose-900 border border-rose-800/40 text-xs text-rose-200 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
