import { describe, expect, it } from 'vitest';
import type { ExecutionMetrics } from '../../api/types';
import { MOVES_EXPLANATION, TIME_DISCLAIMER, buildConclusion } from './conclusion';

function run(name: string, metrics: Partial<ExecutionMetrics>) {
  return {
    name,
    metrics: { comparisons: 0, swaps: 0, moves: 0, totalSteps: 0, executionTimeMs: 0, inputSize: 8, ...metrics },
  };
}

describe('buildConclusion', () => {
  it('não conclui nada com menos de dois algoritmos', () => {
    expect(buildConclusion([run('Bubble Sort', {})])).toEqual([]);
  });

  it('aponta quem fez menos e mais comparações e movimentações', () => {
    const lines = buildConclusion([
      run('Bubble Sort', { comparisons: 4950, moves: 14850 }),
      run('Insertion Sort', { comparisons: 4950, moves: 5049 }),
      run('Quick Sort', { comparisons: 1810, moves: 513 }),
    ]);

    expect(lines).toEqual([
      'Quick Sort teve menos comparações (C) (1810); Bubble Sort teve mais (4950).',
      'Quick Sort teve menos movimentações (M) (513); Bubble Sort teve mais (14850).',
      MOVES_EXPLANATION,
      TIME_DISCLAIMER,
    ]);
  });

  it('diferencia algoritmos com as mesmas comparações pelas movimentações', () => {
    const lines = buildConclusion([
      run('Bubble Sort', { comparisons: 120, moves: 360 }),
      run('Insertion Sort', { comparisons: 120, moves: 135 }),
    ]);

    expect(lines[0]).toBe('Todos empataram em comparações (C) (120).');
    expect(lines[1]).toBe('Insertion Sort teve menos movimentações (M) (135); Bubble Sort teve mais (360).');
  });

  it('reconhece empates parciais', () => {
    const lines = buildConclusion([
      run('Bubble Sort', { comparisons: 4, moves: 0 }),
      run('Insertion Sort', { comparisons: 4, moves: 3 }),
      run('Quick Sort', { comparisons: 10, moves: 5 }),
    ]);

    expect(lines[0]).toBe('Bubble Sort e Insertion Sort tiveram menos comparações (C) (4); Quick Sort teve mais (10).');
  });
});
