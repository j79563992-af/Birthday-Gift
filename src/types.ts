export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isMidnightReached: boolean;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  date?: string;
  caption: string;
  rotation: number;
}

export interface LoveNote {
  id: number;
  title: string;
  message: string;
  icon?: string;
}
