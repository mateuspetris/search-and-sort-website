import { useMemo } from 'react';
import type { SortResponse } from '../../../api/types';
import { cumulativeMetrics, viewAt } from '../stepView';
import { Bars } from './Bars';
import styles from './LabViewer.module.css';

interface LabViewerProps {
  execution: SortResponse;
  position: number;
  barsHeight?: number;
  compact?: boolean;
}

/** Desenha uma execução em uma posição da linha do tempo: barras, explicação do passo e indicadores. */
export function LabViewer({ execution, position, barsHeight, compact = false }: LabViewerProps) {
  const metrics = useMemo(() => cumulativeMetrics(execution.steps), [execution.steps]);
  const clamped = Math.min(position, execution.steps.length);
  const view = viewAt(execution, clamped);

  return (
    <div className={styles.viewer}>
      <Bars view={view} height={barsHeight} />
      <p className={`${styles.message} ${compact ? styles.compactMessage : ''}`} aria-live="polite">
        {view.type && <span className={styles.type}>{view.type}</span>}
        {view.message}
      </p>
      <dl className={styles.metrics}>
        <Metric label="Comparações (C)" value={metrics.comparisons[clamped]!} total={execution.metrics.comparisons} />
        <Metric label="Movimentações (M)" value={metrics.moves[clamped]!} total={execution.metrics.moves} />
        <Metric label="Trocas" value={metrics.swaps[clamped]!} total={execution.metrics.swaps} />
        <Metric label="Passos" value={clamped} total={execution.metrics.totalSteps} />
      </dl>
    </div>
  );
}

function Metric({ label, value, total }: { label: string; value: number; total: number }) {
  return (
    <div className={styles.metric}>
      <dt>{label}</dt>
      <dd>
        <span className={styles.value}>{value}</span>
        <span className={styles.total}> / {total}</span>
      </dd>
    </div>
  );
}
