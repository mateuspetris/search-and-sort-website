import type { ExampleFrame } from '../content';
import styles from './ExampleStrip.module.css';

/** Exemplo visual simples: uma sequência curta de estados escritos à mão. */
export function ExampleStrip({ frames }: { frames: ExampleFrame[] }) {
  return (
    <ol className={styles.strip}>
      {frames.map((frame, frameIndex) => (
        <li key={frameIndex} className={styles.frame}>
          <span className={styles.number}>{frameIndex + 1}</span>
          <div className={styles.cells}>
            {frame.values.map((value, index) => (
              <span
                key={index}
                className={[
                  styles.cell,
                  frame.highlight?.includes(index) && styles.highlight,
                  frame.pivot === index && styles.pivot,
                  frame.splits?.includes(index) && styles.split,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {value}
              </span>
            ))}
          </div>
          <p className={styles.note}>{frame.note}</p>
        </li>
      ))}
    </ol>
  );
}
