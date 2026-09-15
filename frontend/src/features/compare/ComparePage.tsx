import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { executeAlgorithm } from '../../api/algorithms';
import { MAX_ARRAY_SIZE, type AlgorithmId, type SortResponse } from '../../api/types';
import { Button } from '../../components/Button/Button';
import { Section } from '../../components/Section/Section';
import { ErrorMessage, LoadingMessage } from '../../components/StatusMessage/StatusMessage';
import { ALGORITHMS, getAlgorithmContent, isAlgorithmId } from '../algorithms/content';
import { InputControls } from '../lab/components/InputControls';
import { LabViewer } from '../lab/components/LabViewer';
import { Legend } from '../lab/components/Legend';
import { PlaybackControls } from '../lab/components/PlaybackControls';
import { DEFAULT_SIZE, generateInput, type InputType } from '../lab/inputGenerators';
import { DEFAULT_SPEED_INDEX, SPEEDS, usePlayback } from '../lab/usePlayback';
import { buildConclusion } from './conclusion';
import { MetricsChart } from './MetricsChart';
import styles from './ComparePage.module.css';

const MIN_SELECTED = 2;
const MAX_SELECTED = 4;
const NO_RESULTS: SortResponse[] = [];

type RunState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; results: SortResponse[] }
  | { status: 'error'; error: Error };

function initialSelection(param: string | null): AlgorithmId[] {
  const ids = (param ?? '').split(',').filter(isAlgorithmId);
  const unique = [...new Set(ids)].slice(0, MAX_SELECTED);
  const defaults: AlgorithmId[] = ['bubble-sort', 'quick-sort'];
  for (const id of defaults) {
    if (unique.length < MIN_SELECTED && !unique.includes(id)) {
      unique.push(id);
    }
  }
  return unique;
}

export function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(() => initialSelection(searchParams.get('algoritmos')));
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [inputType, setInputType] = useState<InputType>('random');
  const [values, setValues] = useState(() => generateInput('random', DEFAULT_SIZE));
  const [speedIndex, setSpeedIndex] = useState(DEFAULT_SPEED_INDEX);
  const [run, setRun] = useState<RunState>({ status: 'idle' });

  const results = useMemo(() => (run.status === 'success' ? run.results : NO_RESULTS), [run]);
  const longest = Math.max(0, ...results.map((result) => result.steps.length));
  const playback = usePlayback(longest, SPEEDS[speedIndex]!.delayMs, results);

  const conclusion = useMemo(
    () => buildConclusion(results.map((r) => ({ name: getAlgorithmContent(r.algorithm).name, metrics: r.metrics }))),
    [results],
  );

  // Execução em andamento: cancelada quando a entrada ou a seleção mudam, ou quando a página é fechada.
  const pendingRun = useRef<AbortController | null>(null);
  useEffect(() => () => pendingRun.current?.abort(), []);

  function discardRun() {
    pendingRun.current?.abort();
    pendingRun.current = null;
    setRun({ status: 'idle' });
  }

  function toggle(id: AlgorithmId) {
    const next = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
    if (next.length > MAX_SELECTED) {
      return;
    }
    setSelected(next);
    setSearchParams({ algoritmos: next.join(',') }, { replace: true });
    discardRun();
  }

  // Resultados antigos são descartados para nunca exibir uma execução com outra entrada.
  function changeInput(nextType: InputType, nextSize: number) {
    setInputType(nextType);
    setSize(nextSize);
    setValues(generateInput(nextType, nextSize));
    discardRun();
  }

  async function execute() {
    pendingRun.current?.abort();
    const controller = new AbortController();
    pendingRun.current = controller;
    setRun({ status: 'loading' });
    try {
      const responses = await Promise.all(selected.map((id) => executeAlgorithm(id, values, controller.signal)));
      if (!controller.signal.aborted) {
        setRun({ status: 'success', results: responses });
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setRun({ status: 'error', error: error instanceof Error ? error : new Error(String(error)) });
      }
    } finally {
      if (pendingRun.current === controller) {
        pendingRun.current = null;
      }
    }
  }

  const canRun = selected.length >= MIN_SELECTED && run.status !== 'loading';

  return (
    <>
      <Section
        eyebrow="Laboratório"
        title="Comparar algoritmos"
        lead={`Escolha de ${MIN_SELECTED} a ${MAX_SELECTED} algoritmos e execute todos sobre exatamente a mesma entrada.`}
      >
        <div className={styles.setup}>
          <fieldset className={styles.picker}>
            <legend className={styles.pickerLegend}>
              Algoritmos <span>({selected.length}/{MAX_SELECTED})</span>
            </legend>
            {ALGORITHMS.map((algorithm) => {
              const checked = selected.includes(algorithm.id);
              return (
                <label key={algorithm.id} className={`${styles.chip} ${checked ? styles.chipOn : ''}`}>
                  <input
                    type="checkbox"
                    className="visually-hidden"
                    checked={checked}
                    disabled={!checked && selected.length >= MAX_SELECTED}
                    onChange={() => toggle(algorithm.id)}
                  />
                  {algorithm.name}
                </label>
              );
            })}
          </fieldset>

          <div className={styles.inputRow}>
            <InputControls
              size={size}
              inputType={inputType}
              onSizeChange={(nextSize) => changeInput(inputType, nextSize)}
              onInputTypeChange={(nextType) => changeInput(nextType, size)}
              onRegenerate={() => changeInput(inputType, size)}
            />
            <Button onClick={execute} disabled={!canRun}>
              {run.status === 'loading' ? 'Executando…' : 'Executar comparação'}
            </Button>
          </div>
          <p className={styles.hint}>
            Entrada atual ({values.length} de no máximo {MAX_ARRAY_SIZE} elementos):{' '}
            <code>[{values.join(', ')}]</code>
          </p>
        </div>
      </Section>

      {run.status === 'loading' && (
        <Section>
          <LoadingMessage label="Executando os algoritmos no servidor…" />
        </Section>
      )}

      {run.status === 'error' && (
        <Section>
          <ErrorMessage error={run.error} onRetry={execute} />
        </Section>
      )}

      {run.status === 'success' && (
        <>
          <Section muted eyebrow="Execução" title="Lado a lado" lead="Todos avançam um passo por vez: quem precisa de menos passos termina antes.">
            <div className={styles.playback}>
              <PlaybackControls playback={playback} speedIndex={speedIndex} onSpeedChange={setSpeedIndex} />
              <Legend />
            </div>
            <div className={styles.panels}>
              {results.map((result) => (
                <div key={result.algorithm} className={styles.panel}>
                  <h3 className={styles.panelTitle}>
                    {getAlgorithmContent(result.algorithm).name}
                    {playback.position >= result.steps.length && playback.position > 0 && (
                      <span className={styles.done}>concluído</span>
                    )}
                  </h3>
                  <LabViewer execution={result} position={playback.position} barsHeight={11} compact />
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Resultado" title="Métricas">
            <MetricsChart results={results} />
            <div className={styles.conclusion}>
              <h3>Conclusão</h3>
              {conclusion.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Section>
        </>
      )}
    </>
  );
}
