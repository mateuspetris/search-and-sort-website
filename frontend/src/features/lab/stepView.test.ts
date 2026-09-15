import { describe, expect, it } from 'vitest';
import { bubbleExecution, buildExecution } from '../../test/fixtures';
import { INITIAL_MESSAGE, cumulativeMetrics, viewAt } from './stepView';

describe('viewAt', () => {
  it('posição 0 mostra o array inicial sem destaques', () => {
    const view = viewAt(bubbleExecution, 0);

    expect(view.values).toEqual([3, 1, 2]);
    expect(view.states).toEqual(['default', 'default', 'default']);
    expect(view.type).toBeNull();
    expect(view.message).toBe(INITIAL_MESSAGE);
  });

  it('destaca as posições comparadas e trocadas', () => {
    expect(viewAt(bubbleExecution, 1).states).toEqual(['compare', 'compare', 'default']);

    const swap = viewAt(bubbleExecution, 2);
    expect(swap.values).toEqual([1, 3, 2]);
    expect(swap.states).toEqual(['swap', 'swap', 'default']);
    expect(swap.message).toBe('Troca entre as posições 0 e 1.');
  });

  it('COMPLETE marca todos como ordenados', () => {
    expect(viewAt(bubbleExecution, 6).states).toEqual(['sorted', 'sorted', 'sorted']);
  });

  it('posições além do fim mostram o último passo', () => {
    expect(viewAt(bubbleExecution, 99).type).toBe('COMPLETE');
  });

  it('mostra pivô e intervalo do particionamento', () => {
    const execution = buildExecution(
      [3, 1, 2],
      [
        { type: 'PIVOT_SELECTED', values: [3, 1, 2], indexes: [2], pivotIndex: 2, message: 'pivô' },
        { type: 'COMPARISON', values: [3, 1, 2], indexes: [0, 2], pivotIndex: 2, message: 'compara' },
        { type: 'PARTITION', values: [1, 2, 3], indexes: [0, 2], pivotIndex: 1, message: 'particiona' },
      ],
    );

    expect(viewAt(execution, 1).states).toEqual(['default', 'default', 'pivot']);
    const comparison = viewAt(execution, 2);
    expect(comparison.states).toEqual(['compare', 'default', 'compare']);
    expect(comparison.pivotIndex).toBe(2);

    const partition = viewAt(execution, 3);
    expect(partition.range).toEqual([0, 2]);
    expect(partition.states).toEqual(['default', 'pivot', 'default']);
  });

  it('inserções e mesclagens aparecem como escrita', () => {
    const execution = buildExecution(
      [2, 1],
      [
        { type: 'INSERTION', values: [2, 2], indexes: [1], message: 'desloca' },
        { type: 'MERGE', values: [1, 2], indexes: [0], message: 'mescla' },
      ],
    );

    expect(viewAt(execution, 1).states).toEqual(['default', 'write']);
    expect(viewAt(execution, 2).states).toEqual(['write', 'default']);
  });
});

describe('cumulativeMetrics', () => {
  it('acumula comparações, trocas e movimentações por posição, começando do estado inicial', () => {
    const metrics = cumulativeMetrics(bubbleExecution.steps);

    expect(metrics.comparisons).toEqual([0, 1, 1, 2, 2, 3, 3]);
    expect(metrics.swaps).toEqual([0, 0, 1, 1, 2, 2, 2]);
    expect(metrics.moves).toEqual([0, 0, 3, 3, 6, 6, 6]);
  });

  it('soma movimentações que não geram passo próprio (ex.: cópia da chave)', () => {
    const execution = buildExecution(
      [2, 1],
      [
        { type: 'COMPARISON', values: [2, 1], indexes: [0, 1], moves: 1, message: 'chave copiada e comparada' },
        { type: 'INSERTION', values: [2, 2], indexes: [1], moves: 1, message: 'desloca' },
        { type: 'INSERTION', values: [1, 2], indexes: [0], moves: 1, message: 'insere' },
      ],
    );

    expect(cumulativeMetrics(execution.steps).moves).toEqual([0, 1, 2, 3]);
  });
});
