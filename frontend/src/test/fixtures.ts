import type { ExecutionStep, SortResponse } from '../api/types';

type StepInput = Omit<ExecutionStep, 'step' | 'involvedValues' | 'pivotIndex' | 'moves'> &
  Partial<Pick<ExecutionStep, 'involvedValues' | 'pivotIndex' | 'moves'>>;

export function buildExecution(initialArray: number[], steps: StepInput[]): SortResponse {
  const fullSteps: ExecutionStep[] = steps.map((step, index) => ({
    involvedValues: [],
    pivotIndex: null,
    moves: step.type === 'SWAP' ? 3 : 0,
    ...step,
    step: index + 1,
  }));
  return {
    algorithm: 'bubble-sort',
    initialArray,
    finalArray: fullSteps.at(-1)?.values ?? initialArray,
    metrics: {
      comparisons: fullSteps.filter((step) => step.type === 'COMPARISON').length,
      swaps: fullSteps.filter((step) => step.type === 'SWAP').length,
      moves: fullSteps.reduce((sum, step) => sum + step.moves, 0),
      totalSteps: fullSteps.length,
      executionTimeMs: 0.1,
      inputSize: initialArray.length,
    },
    steps: fullSteps,
  };
}

/** Execução real do Bubble Sort para [3, 1, 2], como devolvida pelo backend. */
export const bubbleExecution = buildExecution(
  [3, 1, 2],
  [
    { type: 'COMPARISON', values: [3, 1, 2], indexes: [0, 1], message: '3 é maior que 1. Os elementos serão trocados.' },
    { type: 'SWAP', values: [1, 3, 2], indexes: [0, 1], message: 'Troca entre as posições 0 e 1.' },
    { type: 'COMPARISON', values: [1, 3, 2], indexes: [1, 2], message: '3 é maior que 2. Os elementos serão trocados.' },
    { type: 'SWAP', values: [1, 2, 3], indexes: [1, 2], message: 'Troca entre as posições 1 e 2.' },
    { type: 'COMPARISON', values: [1, 2, 3], indexes: [0, 1], message: '1 não é maior que 2. Nenhuma troca necessária.' },
    { type: 'COMPLETE', values: [1, 2, 3], indexes: [], message: 'Ordenação concluída.' },
  ],
);
