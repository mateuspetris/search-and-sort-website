import { useCallback, useEffect, useState } from 'react';
import { executeAlgorithm } from '../../api/algorithms';
import type { AlgorithmId, SortResponse } from '../../api/types';

export type ExecutionState =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'success'; data: SortResponse; error?: undefined }
  | { status: 'error'; data?: undefined; error: Error };

const DEBOUNCE_MS = 200;

/**
 * Executa o algoritmo no backend sempre que a entrada muda.
 * Mudanças rápidas (ex.: arrastar o controle de tamanho) são agrupadas e requisições antigas são canceladas.
 */
export function useExecution(algorithmId: AlgorithmId, values: number[]): ExecutionState & { retry: () => void } {
  const [state, setState] = useState<ExecutionState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    const timer = setTimeout(() => {
      executeAlgorithm(algorithmId, values, controller.signal).then(
        (data) => setState({ status: 'success', data }),
        (error: unknown) => {
          if (!controller.signal.aborted) {
            setState({ status: 'error', error: error instanceof Error ? error : new Error(String(error)) });
          }
        },
      );
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [algorithmId, values, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
