import type { ErrorResponse } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/** Erro de uma chamada à API, com a mensagem pronta para exibição. */
export class ApiError extends Error {
  readonly status: number;
  readonly body?: ErrorResponse;

  constructor(message: string, status: number, body?: ErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw cause;
    }
    throw new ApiError('Não foi possível conectar ao servidor. Verifique se o backend está em execução.', 0);
  }

  if (!response.ok) {
    const body = await readErrorBody(response);
    throw new ApiError(body?.message ?? `Erro inesperado do servidor (HTTP ${response.status}).`, response.status, body);
  }

  return (await response.json()) as T;
}

export function postJson<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
}

async function readErrorBody(response: Response): Promise<ErrorResponse | undefined> {
  try {
    const body = (await response.json()) as Partial<ErrorResponse>;
    return typeof body.message === 'string' ? (body as ErrorResponse) : undefined;
  } catch {
    return undefined;
  }
}
