import { useEffect, useRef, useState } from 'react';
import type { AlgorithmId } from '../../api/types';
import { ErrorMessage, LoadingMessage } from '../../components/StatusMessage/StatusMessage';
import { InputControls } from './components/InputControls';
import { LabViewer } from './components/LabViewer';
import { Legend } from './components/Legend';
import { PlaybackControls } from './components/PlaybackControls';
import { DEFAULT_SIZE, generateInput, type InputType } from './inputGenerators';
import { useExecution } from './useExecution';
import { DEFAULT_SPEED_INDEX, SPEEDS, usePlayback } from './usePlayback';
import styles from './AlgorithmLab.module.css';

export interface LabPreset {
  inputType: InputType;
  /** Muda a cada pedido, para aplicar o mesmo tipo de entrada mais de uma vez. */
  requestId: number;
}

interface AlgorithmLabProps {
  algorithmId: AlgorithmId;
  preset?: LabPreset;
}

export function AlgorithmLab({ algorithmId, preset }: AlgorithmLabProps) {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [inputType, setInputType] = useState<InputType>('random');
  const [values, setValues] = useState(() => generateInput('random', DEFAULT_SIZE));
  const [speedIndex, setSpeedIndex] = useState(DEFAULT_SPEED_INDEX);

  const execution = useExecution(algorithmId, values);
  const playback = usePlayback(execution.data?.steps.length ?? 0, SPEEDS[speedIndex]!.delayMs, execution.data);

  // Reage apenas a novos pedidos de preset; o tamanho é lido no momento do pedido.
  const sizeRef = useRef(size);
  sizeRef.current = size;
  useEffect(() => {
    if (preset) {
      setInputType(preset.inputType);
      setValues(generateInput(preset.inputType, sizeRef.current));
    }
  }, [preset]);

  function changeSize(nextSize: number) {
    setSize(nextSize);
    setValues(generateInput(inputType, nextSize));
  }

  function changeInputType(nextType: InputType) {
    setInputType(nextType);
    setValues(generateInput(nextType, size));
  }

  return (
    <div className={styles.lab}>
      <div className={styles.toolbar}>
        <InputControls
          size={size}
          inputType={inputType}
          onSizeChange={changeSize}
          onInputTypeChange={changeInputType}
          onRegenerate={() => setValues(generateInput(inputType, size))}
        />
        <PlaybackControls
          playback={playback}
          speedIndex={speedIndex}
          onSpeedChange={setSpeedIndex}
          disabled={execution.status !== 'success'}
        />
      </div>

      <div className={styles.stage}>
        {execution.status === 'success' && <LabViewer execution={execution.data} position={playback.position} />}
        {execution.status === 'loading' && (
          <div className={styles.placeholder}>
            <LoadingMessage label="Executando no servidor…" />
          </div>
        )}
        {execution.status === 'error' && (
          <div className={styles.placeholder}>
            <ErrorMessage error={execution.error} onRetry={execution.retry} />
          </div>
        )}
      </div>

      <Legend />
    </div>
  );
}
