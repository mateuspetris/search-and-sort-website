import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as api from '../../api/algorithms';
import { ApiError } from '../../api/client';
import { bubbleExecution } from '../../test/fixtures';
import { AlgorithmLab } from './AlgorithmLab';

/** Avança o relógio falso e deixa as promessas pendentes resolverem. */
async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

describe('AlgorithmLab', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('executa no backend e reproduz os passos ao iniciar', async () => {
    const execute = vi.spyOn(api, 'executeAlgorithm').mockResolvedValue(bubbleExecution);

    render(<AlgorithmLab algorithmId="bubble-sort" />);
    await advance(250);

    expect(execute).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith('bubble-sort', expect.any(Array), expect.any(AbortSignal));
    expect(screen.getByText(/Estado inicial/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }));
    await advance(300);

    expect(screen.getByText('3 é maior que 1. Os elementos serão trocados.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pausar' })).toBeInTheDocument();
  });

  it('mostra a mensagem do backend quando a execução falha', async () => {
    vi.spyOn(api, 'executeAlgorithm').mockRejectedValue(new ApiError('The array cannot be empty.', 400));

    render(<AlgorithmLab algorithmId="bubble-sort" />);
    await advance(250);

    expect(screen.getByRole('alert')).toHaveTextContent('The array cannot be empty.');
    expect(screen.getByRole('button', { name: 'Iniciar' })).toBeDisabled();
  });
});
