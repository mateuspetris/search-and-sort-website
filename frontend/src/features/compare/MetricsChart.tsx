import type { ExecutionMetrics, SortResponse } from '../../api/types';
import { getAlgorithmContent } from '../algorithms/content';
import styles from './MetricsChart.module.css';

const METRICS: { key: keyof ExecutionMetrics; label: string; format?: (value: number) => string }[] = [
  { key: 'comparisons', label: 'Comparações (C)' },
  { key: 'moves', label: 'Movimentações (M)' },
  { key: 'swaps', label: 'Trocas' },
  { key: 'totalSteps', label: 'Passos' },
  { key: 'executionTimeMs', label: 'Tempo (ms)', format: (value) => value.toFixed(2) },
];

/** Gráfico de barras horizontais: recurso complementar à conclusão textual. */
export function MetricsChart({ results }: { results: SortResponse[] }) {
  return (
    <div className={styles.grid}>
      {METRICS.map((metric) => {
        const max = Math.max(...results.map((result) => result.metrics[metric.key]));
        return (
          <figure key={metric.key} className={styles.metric}>
            <figcaption className={styles.caption}>{metric.label}</figcaption>
            <table className={styles.rows}>
              <tbody>
                {results.map((result) => {
                  const value = result.metrics[metric.key];
                  const width = max > 0 ? (value / max) * 100 : 0;
                  return (
                    <tr key={result.algorithm}>
                      <th scope="row">{getAlgorithmContent(result.algorithm).name}</th>
                      <td>
                        <span className={styles.track}>
                          <span className={styles.fill} style={{ width: `${width}%` }} />
                        </span>
                      </td>
                      <td className={styles.value}>{metric.format ? metric.format(value) : value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </figure>
        );
      })}
    </div>
  );
}
