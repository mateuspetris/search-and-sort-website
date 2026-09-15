import { Link } from 'react-router';
import { Badge } from '../../../components/Badge/Badge';
import { ALGORITHMS } from '../content';
import { AlgorithmIllustration } from './AlgorithmIllustration';
import styles from './AlgorithmList.module.css';

/** Lista editorial dos algoritmos: ilustração, nome, resumo e complexidade. */
export function AlgorithmList() {
  return (
    <ul className={styles.list}>
      {ALGORITHMS.map((algorithm, index) => (
        <li key={algorithm.id}>
          <Link to={`/algoritmos/${algorithm.id}`} className={styles.item}>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.art}>
              <AlgorithmIllustration id={algorithm.id} />
            </span>
            <span className={styles.text}>
              <span className={styles.name}>{algorithm.name}</span>
              <span className={styles.tagline}>{algorithm.tagline}</span>
            </span>
            <span className={styles.meta}>
              <Badge tone="green">{algorithm.headlineComplexity}</Badge>
              <span className={styles.more} aria-hidden="true">
                Explorar →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
