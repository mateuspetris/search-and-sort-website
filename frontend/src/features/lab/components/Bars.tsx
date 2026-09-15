import type { StepView } from '../stepView';
import styles from './Bars.module.css';

const MAX_LABELED_BARS = 24;

interface BarsProps {
  view: StepView;
  /** Altura em rem. */
  height?: number;
}

export function Bars({ view, height = 18 }: BarsProps) {
  const max = Math.max(1, ...view.values.map(Math.abs));
  const showLabels = view.values.length <= MAX_LABELED_BARS;
  const [rangeStart, rangeEnd] = view.range ?? [-1, -1];

  return (
    <div
      className={styles.bars}
      style={{ height: `${height}rem` }}
      role="img"
      aria-label={`Array: ${view.values.join(', ')}`}
    >
      {view.values.map((value, index) => {
        const inRange = index >= rangeStart && index <= rangeEnd;
        const isPivot = view.pivotIndex === index;
        return (
          <div key={index} className={`${styles.slot} ${inRange ? styles.inRange : ''}`}>
            {isPivot && (
              <span className={styles.pivotMarker} aria-hidden="true">
                pivô
              </span>
            )}
            <div
              className={`${styles.bar} ${styles[view.states[index] ?? 'default']} ${isPivot ? styles.pivotEdge : ''}`}
              style={{ height: `${Math.max(3, (Math.abs(value) / max) * 100)}%` }}
            />
            {showLabels && <span className={styles.label}>{value}</span>}
          </div>
        );
      })}
    </div>
  );
}
