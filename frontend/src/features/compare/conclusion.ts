import type { ExecutionMetrics } from '../../api/types';

export interface ComparedRun {
  name: string;
  metrics: ExecutionMetrics;
}

type CountMetric = 'comparisons' | 'moves';

const LABELS: Record<CountMetric, string> = {
  comparisons: 'comparações (C)',
  moves: 'movimentações (M)',
};

export const MOVES_EXPLANATION =
  'Movimentações contam toda atribuição de elemento, como na análise de Wirth: uma troca custa 3, um deslocamento custa 1. Por isso algoritmos com o mesmo número de comparações podem ter custos bem diferentes.';

export const TIME_DISCLAIMER =
  'O tempo medido aqui inclui o registro de cada passo da animação. Para comparar tempos reais, use a Tabela de tempos.';

/** Conclusão textual explicando a diferença observada entre as execuções. */
export function buildConclusion(runs: ComparedRun[]): string[] {
  if (runs.length < 2) {
    return [];
  }
  return [leaderLine(runs, 'comparisons'), leaderLine(runs, 'moves'), MOVES_EXPLANATION, TIME_DISCLAIMER];
}

function leaderLine(runs: ComparedRun[], metric: CountMetric): string {
  const best = Math.min(...runs.map((run) => run.metrics[metric]));
  const names = runs.filter((run) => run.metrics[metric] === best).map((run) => run.name);
  if (names.length === runs.length) {
    return `Todos empataram em ${LABELS[metric]} (${best}).`;
  }
  const worst = runs.reduce((a, b) => (b.metrics[metric] > a.metrics[metric] ? b : a));
  return `${joinNames(names)} ${names.length > 1 ? 'tiveram' : 'teve'} menos ${LABELS[metric]} (${best}); ${worst.name} teve mais (${worst.metrics[metric]}).`;
}

function joinNames(names: string[]): string {
  return names.length === 1 ? names[0]! : `${names.slice(0, -1).join(', ')} e ${names.at(-1)}`;
}
