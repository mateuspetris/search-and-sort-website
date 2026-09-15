import { postJson } from './client';
import type { BenchmarkResponse } from './types';

/** POST /api/benchmarks — sem `sizes`, o backend usa N = 256 e 2048, como no quadro de Wirth. */
export function runBenchmark(sizes?: number[], signal?: AbortSignal): Promise<BenchmarkResponse> {
  return postJson<BenchmarkResponse>('/api/benchmarks', sizes ? { sizes } : {}, signal);
}
