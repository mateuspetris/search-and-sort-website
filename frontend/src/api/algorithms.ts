import { postJson, request } from './client';
import type { AlgorithmId, AlgorithmInfo, SortResponse } from './types';

let algorithmsCache: Promise<AlgorithmInfo[]> | null = null;

/** GET /api/algorithms — metadados estáticos; a lista é buscada uma vez por sessão. */
export function listAlgorithms(): Promise<AlgorithmInfo[]> {
  if (!algorithmsCache) {
    algorithmsCache = request<AlgorithmInfo[]>('/api/algorithms').catch((error: unknown) => {
      algorithmsCache = null;
      throw error;
    });
  }
  return algorithmsCache;
}

/** GET /api/algorithms/{id} */
export function getAlgorithm(id: AlgorithmId): Promise<AlgorithmInfo> {
  return request<AlgorithmInfo>(`/api/algorithms/${encodeURIComponent(id)}`);
}

/** POST /api/algorithms/{id}/execute */
export function executeAlgorithm(id: AlgorithmId, values: number[], signal?: AbortSignal): Promise<SortResponse> {
  return postJson<SortResponse>(`/api/algorithms/${encodeURIComponent(id)}/execute`, { values }, signal);
}

export function clearAlgorithmsCache(): void {
  algorithmsCache = null;
}
