import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearAlgorithmsCache, executeAlgorithm, listAlgorithms } from './algorithms';
import { runBenchmark } from './benchmarks';
import { ApiError } from './client';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

describe('API client', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    clearAlgorithmsCache();
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('executa o algoritmo com POST e o array no corpo', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ algorithm: 'quick-sort', steps: [] }));

    const response = await executeAlgorithm('quick-sort', [3, 1, 2]);

    expect(response.algorithm).toBe('quick-sort');
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/algorithms/quick-sort/execute');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ values: [3, 1, 2] }));
    expect(new Headers(init?.headers).get('Content-Type')).toBe('application/json');
  });

  it('converte o ErrorResponse do backend em ApiError com a mensagem', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        { timestamp: '2026-09-14T21:30:00', status: 400, error: 'Invalid Array', message: 'The array cannot be empty.', path: '/x' },
        400,
      ),
    );

    const error = await executeAlgorithm('bubble-sort', []).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
    expect((error as ApiError).message).toBe('The array cannot be empty.');
    expect((error as ApiError).body?.error).toBe('Invalid Array');
  });

  it('usa mensagem genérica quando a resposta de erro não é JSON', async () => {
    fetchMock.mockResolvedValue(new Response('<html>Bad Gateway</html>', { status: 502 }));

    await expect(executeAlgorithm('bubble-sort', [1])).rejects.toThrow('Erro inesperado do servidor (HTTP 502).');
  });

  it('informa quando o backend está fora do ar', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    const error = await executeAlgorithm('bubble-sort', [1]).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(0);
    expect((error as ApiError).message).toContain('backend');
  });

  it('propaga cancelamentos sem transformá-los em erro de conexão', async () => {
    fetchMock.mockRejectedValue(new DOMException('aborted', 'AbortError'));

    await expect(executeAlgorithm('bubble-sort', [1])).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('solicita a tabela de tempos com os tamanhos informados ou com o padrão do backend', async () => {
    fetchMock.mockImplementation(async () => jsonResponse({ sizes: [256, 2048], inputs: [], results: [] }));

    await runBenchmark([256, 2048]);
    await runBenchmark();

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/benchmarks');
    expect(init?.method).toBe('POST');
    expect(init?.body).toBe(JSON.stringify({ sizes: [256, 2048] }));
    expect(fetchMock.mock.calls[1]![1]?.body).toBe('{}');
  });

  it('busca a lista de algoritmos uma única vez', async () => {
    fetchMock.mockResolvedValue(jsonResponse([{ id: 'bubble-sort' }]));

    await listAlgorithms();
    await listAlgorithms();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('não guarda em cache uma listagem que falhou', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('offline')).mockResolvedValueOnce(jsonResponse([]));

    await expect(listAlgorithms()).rejects.toBeInstanceOf(ApiError);
    await expect(listAlgorithms()).resolves.toEqual([]);
  });

  it('usa VITE_API_BASE_URL sem duplicar a barra quando ela termina com /', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.exemplo.com/');
    vi.resetModules();
    try {
      const { request } = await import('./client');
      fetchMock.mockResolvedValue(jsonResponse([]));

      await request('/api/algorithms');

      expect(fetchMock.mock.calls[0]![0]).toBe('https://api.exemplo.com/api/algorithms');
    } finally {
      vi.unstubAllEnvs();
      vi.resetModules();
    }
  });
});
