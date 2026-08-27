/**
 * Romantic Melody Synthesizer & Audio Engine
 * Uses Web Audio API to synthesize a romantic music box / piano melody
 * with warm reverberation and emotional chords.
 * Also supports custom user MP3 audio streams.
 */

class RomanticAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private currentStep: number = 0;
  private isCustomAudioPlaying: boolean = false;
  private listeners: ((playing: boolean) => void)[] = [];

  // Romantic Pentatonic/Minor 7th Piano & Music Box Arpeggio Progression (Key of Eb Major / C Minor)
  // Frequencies corresponding to romantic music box bells & soft piano
  private melodyNotes: { note: number; dur: number; octave: number; vel: number }[] = [
    // Phrase 1: Tender opening
    { note: 63, dur: 0.8, octave: 4, vel: 0.7 }, // Eb4
    { note: 67, dur: 0.8, octave: 4, vel: 0.65 }, // G4
    { note: 70, dur: 0.8, octave: 4, vel: 0.8 }, // Bb4
    { note: 75, dur: 1.6, octave: 5, vel: 0.9 }, // Eb5
    
    { note: 74, dur: 0.8, octave: 5, vel: 0.75 }, // D5
    { note: 70, dur: 0.8, octave: 4, vel: 0.7 }, // Bb4
    { note: 67, dur: 1.6, octave: 4, vel: 0.7 }, // G4
    
    // Phrase 2: Gentle yearning
    { note: 65, dur: 0.8, octave: 4, vel: 0.7 }, // F4
    { note: 68, dur: 0.8, octave: 4, vel: 0.75 }, // Ab4
    { note: 72, dur: 0.8, octave: 5, vel: 0.85 }, // C5
    { note: 75, dur: 1.6, octave: 5, vel: 0.9 }, // Eb5
    
    { note: 72, dur: 0.8, octave: 5, vel: 0.7 }, // C5
    { note: 68, dur: 0.8, octave: 4, vel: 0.65 }, // Ab4
    { note: 65, dur: 1.6, octave: 4, vel: 0.7 }, // F4

    // Phrase 3: Romantic Climax
    { note: 60, dur: 0.8, octave: 4, vel: 0.65 }, // C4
    { note: 63, dur: 0.8, octave: 4, vel: 0.7 }, // Eb4
    { note: 67, dur: 0.8, octave: 4, vel: 0.8 }, // G4
    { note: 72, dur: 0.8, octave: 5, vel: 0.85 }, // C5
    { note: 75, dur: 1.2, octave: 5, vel: 0.95 }, // Eb5
    { note: 79, dur: 2.0, octave: 5, vel: 0.9 }, // G5

    // Phrase 4: Soft resolution
    { note: 75, dur: 0.8, octave: 5, vel: 0.7 }, // Eb5
    { note: 70, dur: 0.8, octave: 4, vel: 0.65 }, // Bb4
    { note: 67, dur: 0.8, octave: 4, vel: 0.6 }, // G4
    { note: 63, dur: 2.4, octave: 4, vel: 0.85 }, // Eb4 (sustained warmth)
  ];

  constructor() {
    // Initialized on first user gesture to satisfy browser autoplay policies
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.isPlaying));
  }

  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      if (this.isPlaying) {
        this.stopSynth();
        this.customAudio.play().catch(() => {});
        this.isCustomAudioPlaying = true;
      }
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      await this.start();
      return true;
    }
  }

  public async start(): Promise<void> {
    if (this.isPlaying) return;

    if (this.customAudio) {
      try {
        await this.customAudio.play();
        this.isPlaying = true;
        this.isCustomAudioPlaying = true;
        this.notify();
        return;
      } catch (e) {
        console.warn('Custom audio playback failed, falling back to romantic synthesizer', e);
      }
    }

    // Initialize Web Audio Synth
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    this.isPlaying = true;
    this.currentStep = 0;
    this.playNextSynthNote();
    this.notify();
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio && this.isCustomAudioPlaying) {
      this.customAudio.pause();
      this.isCustomAudioPlaying = false;
    }
    this.notify();
  }

  private stopSynth(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private playTone(freq: number, duration: number, velocity: number = 0.8) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    // Master gain for warm softness
    const masterGain = this.audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.28 * velocity, now);

    // Warm Celeste / Piano chime Oscillator 1 (Sine base)
    const osc1 = this.audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic shimmer Oscillator 2 (Triangle chime)
    const osc2 = this.audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // Octave overtone

    // Delicate music box chime Oscillator 3
    const osc3 = this.audioCtx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now); // Fifth harmonic

    // Individual Envelope Gains
    const gain1 = this.audioCtx.createGain();
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.7, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.2);

    const gain2 = this.audioCtx.createGain();
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.25, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

    const gain3 = this.audioCtx.createGain();
    gain3.gain.setValueAtTime(0, now);
    gain3.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.4);

    // Warm Low-pass Filter for romantic, cozy intimacy
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(1.5, now);

    // Connect node chain
    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter);
    gain2.connect(filter);
    gain3.connect(filter);

    filter.connect(masterGain);
    masterGain.connect(this.audioCtx.destination);

    // Trigger & cleanup
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    const stopTime = now + duration + 1.5;
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);

    // Soft warm bass pad accompaniment on root notes
    if (this.currentStep % 4 === 0) {
      this.playSoftBassPad(freq / 2, duration * 2.5);
    }
  }

  private playSoftBassPad(freq: number, duration: number) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const padOsc = this.audioCtx.createOscillator();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(freq, now);

    const padGain = this.audioCtx.createGain();
    padGain.gain.setValueAtTime(0, now);
    padGain.gain.linearRampToValueAtTime(0.12, now + 0.3);
    padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    padOsc.connect(padGain);
    padGain.connect(this.audioCtx.destination);

    padOsc.start(now);
    padOsc.stop(now + duration + 0.2);
  }

  private playNextSynthNote() {
    if (!this.isPlaying) return;

    const noteObj = this.melodyNotes[this.currentStep];
    const freq = this.midiToFreq(noteObj.note);
    this.playTone(freq, noteObj.dur, noteObj.vel);

    this.currentStep = (this.currentStep + 1) % this.melodyNotes.length;

    // Schedule next note
    const stepDurationMs = noteObj.dur * 850;
    this.timerId = window.setTimeout(() => {
      this.playNextSynthNote();
    }, stepDurationMs);
  }
}

export const romanticAudio = new RomanticAudioPlayer();
