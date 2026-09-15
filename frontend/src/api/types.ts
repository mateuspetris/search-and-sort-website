// Espelho dos DTOs do backend (docs/documentacao-backend.md, seções 7 e 9).

export type OperationType =
  | 'COMPARISON'
  | 'SWAP'
  | 'PIVOT_SELECTED'
  | 'PARTITION'
  | 'MERGE'
  | 'INSERTION'
  | 'COMPLETE';

export type AlgorithmId =
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'shell-sort'
  | 'heap-sort'
  | 'cocktail-shaker-sort';

export interface AlgorithmInfo {
  id: AlgorithmId;
  name: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
}

export interface SortRequest {
  values: number[];
}

export interface ExecutionStep {
  step: number;
  type: OperationType;
  values: number[];
  indexes: number[];
  involvedValues: number[];
  pivotIndex: number | null;
  /** Movimentações (atribuições de elementos) realizadas desde o passo anterior. */
  moves: number;
  message: string;
}

export interface ExecutionMetrics {
  comparisons: number;
  swaps: number;
  /** M de Wirth: troca = 3, deslocamento/escrita/cópia temporária = 1. */
  moves: number;
  totalSteps: number;
  executionTimeMs: number;
  inputSize: number;
}

export interface SortResponse {
  algorithm: AlgorithmId;
  initialArray: number[];
  finalArray: number[];
  metrics: ExecutionMetrics;
  steps: ExecutionStep[];
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export type BenchmarkInput = 'ORDERED' | 'RANDOM' | 'REVERSED';

export interface BenchmarkResult {
  algorithm: AlgorithmId;
  name: string;
  size: number;
  input: BenchmarkInput;
  /** Mediana das execuções, sem registro de passos. */
  timeMs: number;
  runs: number;
  comparisons: number;
  swaps: number;
  moves: number;
}

export interface BenchmarkResponse {
  sizes: number[];
  inputs: BenchmarkInput[];
  results: BenchmarkResult[];
}

/** Maior N aceito pela tabela de tempos (benchmark.max-size). */
export const MAX_BENCHMARK_SIZE = 4096;

/** Limite de elementos aceito pelo backend (sorting.max-array-size). */
export const MAX_ARRAY_SIZE = 64;
