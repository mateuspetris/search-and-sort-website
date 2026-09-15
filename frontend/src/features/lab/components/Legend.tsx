import styles from './Legend.module.css';

const ITEMS = [
  { className: styles.compare, label: 'Comparação' },
  { className: styles.swap, label: 'Troca' },
  { className: styles.write, label: 'Inserção / mesclagem' },
  { className: styles.pivot, label: 'Pivô' },
  { className: styles.range, label: 'Intervalo dividido' },
  { className: styles.sorted, label: 'Ordenado' },
];

export function Legend() {
  return (
    <ul className={styles.legend} aria-label="Legenda das cores">
      {ITEMS.map((item) => (
        <li key={item.label}>
          <span className={`${styles.swatch} ${item.className}`} aria-hidden="true" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
