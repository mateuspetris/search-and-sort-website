import type { AlgorithmId, BenchmarkInput, BenchmarkResponse, BenchmarkResult } from '../../api/types';

export type BenchmarkMetric = 'timeMs' | 'comparisons' | 'moves';

export const METRIC_OPTIONS: { value: BenchmarkMetric; label: string }[] = [
  { value: 'timeMs', label: 'Tempo (ms)' },
  { value: 'comparisons', label: 'Comparações (C)' },
  { value: 'moves', label: 'Movimentações (M)' },
];

export const INPUT_LABELS: Record<BenchmarkInput, string> = {
  ORDERED: 'Ordenado',
  RANDOM: 'Aleatório',
  REVERSED: 'Invertido',
};

/** Ordem das linhas do quadro de Wirth; algoritmos que não estão no quadro vêm no fim. */
const WIRTH_ORDER: AlgorithmId[] = [
  'insertion-sort',
  'selection-sort',
  'bubble-sort',
  'cocktail-shaker-sort',
  'shell-sort',
  'heap-sort',
  'quick-sort',
  'merge-sort',
];

export interface TableColumn {
  size: number;
  input: BenchmarkInput;
}

export interface TableCell {
  value: number;
  best: boolean;
  worst: boolean;
}

export interface TableRow {
  algorithm: AlgorithmId;
  name: string;
  cells: TableCell[];
}

export interface BenchmarkTable {
  columns: TableColumn[];
  rows: TableRow[];
}

/** Organiza os resultados como o quadro comparativo: uma linha por algoritmo, colunas por N e tipo de entrada. */
export function buildTable(response: BenchmarkResponse, metric: BenchmarkMetric): BenchmarkTable {
  const columns = response.sizes.flatMap((size) => response.inputs.map((input) => ({ size, input })));
  const byKey = new Map(response.results.map((r) => [key(r.algorithm, r.size, r.input), r]));

  const algorithms = [...new Map(response.results.map((r) => [r.algorithm, r.name])).entries()].sort(
    ([a], [b]) => rank(a) - rank(b),
  );

  const values = algorithms.map(([algorithm]) =>
    columns.map((column) => valueOf(byKey.get(key(algorithm, column.size, column.input)), metric)),
  );

  const rows = algorithms.map(([algorithm, name], rowIndex) => ({
    algorithm,
    name,
    cells: columns.map((_, columnIndex) => {
      const column = values.map((row) => row[columnIndex]!);
      const value = values[rowIndex]![columnIndex]!;
      return { value, best: value === Math.min(...column), worst: value === Math.max(...column) };
    }),
  }));

  return { columns, rows };
}

export function formatValue(value: number, metric: BenchmarkMetric): string {
  if (metric === 'timeMs') {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  }
  return value.toLocaleString('pt-BR');
}

function valueOf(result: BenchmarkResult | undefined, metric: BenchmarkMetric): number {
  return result ? result[metric] : Number.NaN;
}

function key(algorithm: string, size: number, input: BenchmarkInput) {
  return `${algorithm}|${size}|${input}`;
}

function rank(algorithm: AlgorithmId) {
  const index = WIRTH_ORDER.indexOf(algorithm);
  return index === -1 ? WIRTH_ORDER.length : index;
}
