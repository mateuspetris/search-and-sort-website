import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePlayback } from './usePlayback';

describe('usePlayback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('avança uma posição por intervalo e para no fim', () => {
    const { result } = renderHook(() => usePlayback(3, 100));

    act(() => result.current.play());
    expect(result.current.playing).toBe(true);

    act(() => vi.advanceTimersByTime(100));
    expect(result.current.position).toBe(1);

    act(() => vi.advanceTimersByTime(500));
    expect(result.current.position).toBe(3);
    expect(result.current.playing).toBe(false);
    expect(result.current.finished).toBe(true);
  });

  it('pausa mantém a posição e continuar retoma dali', () => {
    const { result } = renderHook(() => usePlayback(10, 100));

    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.position).toBe(2);

    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.position).toBe(3);
  });

  it('reiniciar volta ao estado inicial', () => {
    const { result } = renderHook(() => usePlayback(10, 100));

    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(300));
    act(() => result.current.reset());

    expect(result.current.position).toBe(0);
    expect(result.current.playing).toBe(false);
  });

  it('play depois de terminar recomeça do início', () => {
    const { result } = renderHook(() => usePlayback(2, 100));

    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(300));
    expect(result.current.finished).toBe(true);

    act(() => result.current.play());
    expect(result.current.position).toBe(0);
    expect(result.current.playing).toBe(true);
  });

  it('nova execução (resetKey) volta para a posição 0', () => {
    const { result, rerender } = renderHook(({ key }) => usePlayback(5, 100, key), { initialProps: { key: 'a' } });

    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(300));
    rerender({ key: 'b' });

    expect(result.current.position).toBe(0);
    expect(result.current.playing).toBe(false);
  });

  it('não inicia sem passos', () => {
    const { result } = renderHook(() => usePlayback(0, 100));

    act(() => result.current.play());

    expect(result.current.playing).toBe(false);
  });
});
