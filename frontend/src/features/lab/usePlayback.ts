import { useCallback, useEffect, useState } from 'react';

export const SPEEDS = [
  { label: 'Lenta', delayMs: 700 },
  { label: 'Normal', delayMs: 300 },
  { label: 'Rápida', delayMs: 90 },
  { label: 'Muito rápida', delayMs: 25 },
] as const;

export const DEFAULT_SPEED_INDEX = 1;

export interface Playback {
  /** 0 = estado inicial; `length` = último passo. */
  position: number;
  playing: boolean;
  finished: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

/**
 * Relógio da animação: avança uma posição a cada `delayMs` até `length`.
 * Volta a zero quando `length` ou `resetKey` mudam, para nunca mostrar passos de outra execução.
 */
export function usePlayback(length: number, delayMs: number, resetKey?: unknown): Playback {
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPosition(0);
    setPlaying(false);
  }, [length, resetKey]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = setInterval(() => {
      setPosition((current) => Math.min(current + 1, length));
    }, delayMs);
    return () => clearInterval(timer);
  }, [playing, delayMs, length]);

  useEffect(() => {
    if (playing && position >= length) {
      setPlaying(false);
    }
  }, [playing, position, length]);

  const play = useCallback(() => {
    if (length === 0) {
      return;
    }
    setPosition((current) => (current >= length ? 0 : current));
    setPlaying(true);
  }, [length]);

  const pause = useCallback(() => setPlaying(false), []);

  const reset = useCallback(() => {
    setPlaying(false);
    setPosition(0);
  }, []);

  return { position, playing, finished: length > 0 && position >= length, play, pause, reset };
}
