import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as api from '../../api/algorithms';
import type { SortResponse } from '../../api/types';
import { bubbleExecution } from '../../test/fixtures';
import { ComparePage } from './ComparePage';

/** Respostas que só chegam quando o teste mandar, ignorando o cancelamento (como um servidor lento). */
function deferredResponses() {
  const pending: { resolve: (response: SortResponse) => void; signal?: AbortSignal }[] = [];
  const execute = vi.spyOn(api, 'executeAlgorithm').mockImplementation(
    (_id, _values, signal) =>
      new Promise<SortResponse>((resolve) => {
        pending.push({ resolve, signal });
      }),
  );
  async function resolveAll() {
    await act(async () => {
      pending.forEach(({ resolve }) => resolve(bubbleExecution));
    });
  }
  return { execute, pending, resolveAll };
}

function renderPage() {
  render(
    <MemoryRouter initialEntries={['/comparar?algoritmos=bubble-sort,quick-sort']}>
      <ComparePage />
    </MemoryRouter>,
  );
}

describe('ComparePage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mostra o resultado quando a execução termina', async () => {
    const { execute, resolveAll } = deferredResponses();
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'Executar comparação' }));
    await resolveAll();

    expect(execute).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('heading', { name: 'Lado a lado' })).toBeInTheDocument();
  });

  it('descarta a resposta de uma execução cuja entrada mudou antes de ela chegar', async () => {
    const { pending, resolveAll } = deferredResponses();
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'Executar comparação' }));
    fireEvent.click(screen.getByRole('button', { name: 'Gerar novos dados' }));

    expect(pending.every(({ signal }) => signal?.aborted)).toBe(true);

    await resolveAll();

    expect(screen.queryByRole('heading', { name: 'Lado a lado' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Executar comparação' })).toBeEnabled();
  });

  it('descarta a resposta antiga quando a seleção de algoritmos muda', async () => {
    const { resolveAll } = deferredResponses();
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'Executar comparação' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Heap Sort' }));
    await resolveAll();

    expect(screen.queryByRole('heading', { name: 'Lado a lado' })).not.toBeInTheDocument();
  });
});
