import { useId, useMemo, useState } from 'react';
import { runBenchmark } from '../../api/benchmarks';
import { MAX_BENCHMARK_SIZE, type BenchmarkResponse } from '../../api/types';
import { Button } from '../../components/Button/Button';
import { Section } from '../../components/Section/Section';
import { ErrorMessage, LoadingMessage } from '../../components/StatusMessage/StatusMessage';
import { INPUT_LABELS, METRIC_OPTIONS, buildTable, formatValue, type BenchmarkMetric } from './benchmarkTable';
import styles from './BenchmarkPage.module.css';

const WIRTH_SIZES = [256, 2048];

type RunState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: BenchmarkResponse }
  | { status: 'error'; error: Error };

export function BenchmarkPage() {
  const [sizes, setSizes] = useState(WIRTH_SIZES);
  const [metric, setMetric] = useState<BenchmarkMetric>('timeMs');
  const [run, setRun] = useState<RunState>({ status: 'idle' });
  const firstId = useId();
  const secondId = useId();

  const validSizes = sizes.every((size) => Number.isInteger(size) && size >= 1 && size <= MAX_BENCHMARK_SIZE);
  const table = useMemo(() => (run.status === 'success' ? buildTable(run.data, metric) : null), [run, metric]);

  function changeSize(index: number, value: string) {
    setSizes((current) => current.map((size, i) => (i === index ? Number(value) : size)));
  }

  async function execute() {
    setRun({ status: 'loading' });
    try {
      setRun({ status: 'success', data: await runBenchmark(sizes) });
    } catch (error) {
      setRun({ status: 'error', error: error instanceof Error ? error : new Error(String(error)) });
    }
  }

  return (
    <>
      <Section
        eyebrow="Laboratório"
        title="Tabela de tempos"
        lead="Reproduz o quadro comparativo de Wirth: todos os algoritmos executados com entradas ordenada, aleatória e invertida para dois tamanhos de N."
      >
        <div className={styles.setup}>
          <label className={styles.field} htmlFor={firstId}>
            <span>N (primeiro)</span>
            <input
              id={firstId}
              type="number"
              min={1}
              max={MAX_BENCHMARK_SIZE}
              value={sizes[0]}
              onChange={(event) => changeSize(0, event.target.value)}
            />
          </label>
          <label className={styles.field} htmlFor={secondId}>
            <span>N (segundo)</span>
            <input
              id={secondId}
              type="number"
              min={1}
              max={MAX_BENCHMARK_SIZE}
              value={sizes[1]}
              onChange={(event) => changeSize(1, event.target.value)}
            />
          </label>
          <Button onClick={execute} disabled={!validSizes || run.status === 'loading'}>
            {run.status === 'loading' ? 'Medindo…' : 'Executar medição'}
          </Button>
          {(sizes[0] !== WIRTH_SIZES[0] || sizes[1] !== WIRTH_SIZES[1]) && (
            <Button variant="ghost" size="sm" onClick={() => setSizes(WIRTH_SIZES)}>
              Usar 256 e 2048
            </Button>
          )}
        </div>
        {!validSizes && <p className={styles.hint}>Cada N deve estar entre 1 e {MAX_BENCHMARK_SIZE}.</p>}
      </Section>

      {run.status === 'loading' && (
        <Section>
          <LoadingMessage label="Medindo os 8 algoritmos no servidor… isso pode levar alguns segundos." />
        </Section>
      )}

      {run.status === 'error' && (
        <Section>
          <ErrorMessage error={run.error} onRetry={execute} />
        </Section>
      )}

      {table && run.status === 'success' && (
        <Section muted eyebrow="Resultado" title="Quadro comparativo">
          <div className={styles.metricSwitch} role="radiogroup" aria-label="Métrica exibida">
            {METRIC_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={metric === option.value}
                className={`${styles.metricOption} ${metric === option.value ? styles.metricOn : ''}`}
                onClick={() => setMetric(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visually-hidden">
                {METRIC_OPTIONS.find((option) => option.value === metric)!.label} por algoritmo, tamanho e tipo de entrada
              </caption>
              <thead>
                <tr>
                  <th rowSpan={2} scope="col" className={styles.methodHeader}>
                    Método
                  </th>
                  {run.data.sizes.map((size) => (
                    <th key={size} colSpan={run.data.inputs.length} scope="colgroup" className={styles.groupHeader}>
                      N = {size.toLocaleString('pt-BR')}
                    </th>
                  ))}
                </tr>
                <tr>
                  {table.columns.map((column) => (
                    <th key={`${column.size}-${column.input}`} scope="col">
                      {INPUT_LABELS[column.input]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.algorithm}>
                    <th scope="row">{row.name}</th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={index}
                        className={[cell.best && styles.best, cell.worst && styles.worst].filter(Boolean).join(' ')}
                      >
                        {formatValue(cell.value, metric)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className={styles.legend}>
            <li>
              <span className={`${styles.swatch} ${styles.best}`} aria-hidden="true" /> Menor valor da coluna
            </li>
            <li>
              <span className={`${styles.swatch} ${styles.worst}`} aria-hidden="true" /> Maior valor da coluna
            </li>
          </ul>

          <div className={styles.notes}>
            <p>
              <strong>Como ler.</strong> Wirth mediu segundos em Modula-2 em um PC da época; aqui os tempos são em
              milissegundos na JVM do servidor. Os valores absolutos não são comparáveis — o que deve se repetir é a
              <em> ordem</em> entre os métodos e a forma como cada um reage a entradas ordenadas, aleatórias e invertidas.
            </p>
            <p>
              Cada tempo é a mediana de várias execuções, sem registro de passos. <strong>C</strong> e{' '}
              <strong>M</strong> são exatos e independem da máquina: M conta atribuições de elementos (troca = 3,
              deslocamento = 1).
            </p>
          </div>
        </Section>
      )}
    </>
  );
}
