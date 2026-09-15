import type { ExecutionStep, OperationType, SortResponse } from '../../api/types';

export type BarState = 'default' | 'compare' | 'swap' | 'write' | 'pivot' | 'sorted';

/** O que deve ser desenhado em uma posição da linha do tempo. */
export interface StepView {
  values: number[];
  states: BarState[];
  /** Intervalo [início, fim] destacado (divisões e partições). */
  range: [number, number] | null;
  pivotIndex: number | null;
  type: OperationType | null;
  message: string;
}

const STATE_BY_TYPE: Partial<Record<OperationType, BarState>> = {
  COMPARISON: 'compare',
  SWAP: 'swap',
  MERGE: 'write',
  INSERTION: 'write',
  PIVOT_SELECTED: 'pivot',
};

export const INITIAL_MESSAGE = 'Estado inicial. Pressione Iniciar para acompanhar a execução.';

/**
 * Posição 0 representa o array inicial; a posição p (1..steps.length) mostra o passo p.
 */
export function viewAt(execution: Pick<SortResponse, 'initialArray' | 'steps'>, position: number): StepView {
  const step = position > 0 ? execution.steps[Math.min(position, execution.steps.length) - 1] : undefined;
  if (!step) {
    return {
      values: execution.initialArray,
      states: execution.initialArray.map(() => 'default'),
      range: null,
      pivotIndex: null,
      type: null,
      message: INITIAL_MESSAGE,
    };
  }
  return {
    values: step.values,
    states: statesFor(step),
    range: step.type === 'PARTITION' ? [step.indexes[0]!, step.indexes[1]!] : null,
    pivotIndex: step.pivotIndex,
    type: step.type,
    message: step.message,
  };
}

function statesFor(step: ExecutionStep): BarState[] {
  if (step.type === 'COMPLETE') {
    return step.values.map(() => 'sorted');
  }
  const states: BarState[] = step.values.map(() => 'default');
  const highlight = STATE_BY_TYPE[step.type];
  if (highlight) {
    for (const index of step.indexes) {
      states[index] = highlight;
    }
  }
  if (step.pivotIndex !== null && states[step.pivotIndex] === 'default') {
    states[step.pivotIndex] = 'pivot';
  }
  return states;
}

export interface CumulativeMetrics {
  comparisons: number[];
  swaps: number[];
  moves: number[];
}

/** Contagens acumuladas em cada posição da linha do tempo (índice 0 = estado inicial). */
export function cumulativeMetrics(steps: ExecutionStep[]): CumulativeMetrics {
  const comparisons = [0];
  const swaps = [0];
  const moves = [0];
  for (const step of steps) {
    comparisons.push(comparisons.at(-1)! + (step.type === 'COMPARISON' ? 1 : 0));
    swaps.push(swaps.at(-1)! + (step.type === 'SWAP' ? 1 : 0));
    moves.push(moves.at(-1)! + step.moves);
  }
  return { comparisons, swaps, moves };
}
