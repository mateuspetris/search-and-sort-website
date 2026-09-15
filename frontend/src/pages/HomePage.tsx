import { MAX_ARRAY_SIZE } from '../api/types';
import { ButtonLink } from '../components/Button/Button';
import { Section } from '../components/Section/Section';
import { AlgorithmList } from '../features/algorithms/components/AlgorithmList';
import styles from './HomePage.module.css';

const UNSORTED = [5, 9, 2, 7, 4, 8, 1, 6, 3];

export function HomePage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Laboratório interativo de algoritmos</p>
          <h1 className={styles.title}>Aprenda algoritmos de ordenação vendo eles funcionarem.</h1>
          <p className={styles.lead}>
            Cada comparação, troca e pivô é executado de verdade em Java e reproduzido passo a passo na tela. Entenda
            o código, experimente entradas diferentes e compare os resultados.
          </p>
          <div className={styles.actions}>
            <ButtonLink to="/algoritmos">Explorar algoritmos</ButtonLink>
            <ButtonLink to="/fundamentos" variant="secondary">
              Começar pelos fundamentos
            </ButtonLink>
          </div>
        </div>
        <HeroIllustration />
      </header>

      <Section
        id="algoritmos"
        eyebrow="Algoritmos"
        title="Oito algoritmos, a mesma narrativa"
        lead="Conceito, passo a passo, visualização, código, características e comparação sempre na mesma ordem."
      >
        <AlgorithmList />
      </Section>

      <Section muted eyebrow="Comparador" title="Mesma entrada, algoritmos diferentes">
        <div className={styles.lab}>
          <div className={styles.labText}>
            <p>
              Escolha até quatro algoritmos, defina o tamanho e o tipo da entrada e acompanhe as execuções lado a lado.
              Quem compara menos? Quem troca menos? Quem sofre com dados já ordenados?
            </p>
            <ButtonLink to="/comparar?algoritmos=bubble-sort,insertion-sort,quick-sort">Abrir o comparador</ButtonLink>
          </div>
          <ul className={styles.labStats}>
            <li>
              <span className={styles.statValue}>7</span>
              <span className={styles.statLabel}>tipos de operação registrados</span>
            </li>
            <li>
              <span className={styles.statValue}>4</span>
              <span className={styles.statLabel}>tipos de entrada para experimentar</span>
            </li>
            <li>
              <span className={styles.statValue}>{MAX_ARRAY_SIZE}</span>
              <span className={styles.statLabel}>elementos por execução</span>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}

function HeroIllustration() {
  const sorted = [...UNSORTED].sort((a, b) => a - b);
  return (
    <svg className={styles.heroArt} viewBox="0 0 320 220" aria-hidden="true">
      {UNSORTED.map((value, index) => (
        <rect
          key={`u${index}`}
          x={8 + index * 15}
          y={140 - value * 12}
          width="11"
          height={value * 12}
          rx="2"
          fill={value === 9 || value === 1 ? 'var(--yellow)' : 'var(--green-tint)'}
        />
      ))}
      <path d="M150 90 H176" stroke="var(--green-dark)" strokeWidth="2" markerEnd="url(#hero-arrow)" />
      {sorted.map((value, index) => (
        <rect
          key={`s${index}`}
          className={styles.sortedBar}
          style={{ animationDelay: `${index * 90}ms` }}
          x={186 + index * 15}
          y={140 - value * 12}
          width="11"
          height={value * 12}
          rx="2"
          fill={index === sorted.length - 1 ? 'var(--green-dark)' : 'var(--green)'}
        />
      ))}
      <line x1="0" y1="146" x2="320" y2="146" stroke="var(--line)" />
      <text x="8" y="172" className={styles.heroCaption}>
        entrada
      </text>
      <text x="186" y="172" className={styles.heroCaption}>
        passo a passo
      </text>
      <defs>
        <marker id="hero-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--green-dark)" />
        </marker>
      </defs>
    </svg>
  );
}
