import { describe, expect, it } from 'vitest';
import type { AlgorithmId, BenchmarkInput, BenchmarkResponse, BenchmarkResult } from '../../api/types';
import { buildTable, formatValue } from './benchmarkTable';

function result(algorithm: AlgorithmId, name: string, size: number, input: BenchmarkInput, timeMs: number, moves = 0): BenchmarkResult {
  return { algorithm, name, size, input, timeMs, runs: 5, comparisons: size, swaps: 0, moves };
}

const response: BenchmarkResponse = {
  sizes: [256],
  inputs: ['ORDERED', 'RANDOM', 'REVERSED'],
  results: [
    result('bubble-sort', 'Bubble Sort', 256, 'ORDERED', 0.001, 0),
    result('bubble-sort', 'Bubble Sort', 256, 'RANDOM', 0.016, 49887),
    result('bubble-sort', 'Bubble Sort', 256, 'REVERSED', 0.032, 97920),
    result('quick-sort', 'Quick Sort', 256, 'ORDERED', 0.002, 256),
    result('quick-sort', 'Quick Sort', 256, 'RANDOM', 0.003, 2829),
    result('quick-sort', 'Quick Sort', 256, 'REVERSED', 0.002, 513),
    result('insertion-sort', 'Insertion Sort', 256, 'ORDERED', 0.001, 255),
    result('insertion-sort', 'Insertion Sort', 256, 'RANDOM', 0.007, 16879),
    result('insertion-sort', 'Insertion Sort', 256, 'REVERSED', 0.012, 33150),
  ],
};

describe('buildTable', () => {
  it('ordena as linhas como o quadro de Wirth e cria colunas por N e entrada', () => {
    const table = buildTable(response, 'timeMs');

    expect(table.rows.map((row) => row.name)).toEqual(['Insertion Sort', 'Bubble Sort', 'Quick Sort']);
    expect(table.columns).toEqual([
      { size: 256, input: 'ORDERED' },
      { size: 256, input: 'RANDOM' },
      { size: 256, input: 'REVERSED' },
    ]);
    expect(table.rows[1]!.cells.map((cell) => cell.value)).toEqual([0.001, 0.016, 0.032]);
  });

  it('marca o menor e o maior valor de cada coluna, incluindo empates', () => {
    const table = buildTable(response, 'timeMs');
    const ordered = table.rows.map((row) => row.cells[0]!);
    const reversed = table.rows.map((row) => row.cells[2]!);

    expect(ordered.map((cell) => cell.best)).toEqual([true, true, false]);
    expect(reversed.map((cell) => cell.worst)).toEqual([false, true, false]);
    expect(reversed.map((cell) => cell.best)).toEqual([false, false, true]);
  });

  it('troca a métrica exibida', () => {
    const table = buildTable(response, 'moves');

    expect(table.rows[1]!.cells.map((cell) => cell.value)).toEqual([0, 49887, 97920]);
  });
});

describe('formatValue', () => {
  it('formata tempo com 3 casas e contagens com separador de milhar', () => {
    expect(formatValue(1.5, 'timeMs')).toBe('1,500');
    expect(formatValue(2096128, 'comparisons')).toBe('2.096.128');
  });
});
