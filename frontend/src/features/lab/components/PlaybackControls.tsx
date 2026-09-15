import { useId } from 'react';
import { Button } from '../../../components/Button/Button';
import { SPEEDS, type Playback } from '../usePlayback';
import styles from './Controls.module.css';

interface PlaybackControlsProps {
  playback: Playback;
  speedIndex: number;
  onSpeedChange: (index: number) => void;
  disabled?: boolean;
}

export function PlaybackControls({ playback, speedIndex, onSpeedChange, disabled = false }: PlaybackControlsProps) {
  const speedId = useId();

  return (
    <div className={styles.group}>
      {playback.playing ? (
        <Button onClick={playback.pause}>Pausar</Button>
      ) : (
        <Button onClick={playback.play} disabled={disabled}>
          {playback.finished ? 'Repetir' : playback.position > 0 ? 'Continuar' : 'Iniciar'}
        </Button>
      )}
      <Button variant="secondary" onClick={playback.reset} disabled={disabled || playback.position === 0}>
        Reiniciar
      </Button>
      <label className={styles.field} htmlFor={speedId}>
        <span className={styles.fieldLabel}>Velocidade</span>
        <select
          id={speedId}
          className={styles.select}
          value={speedIndex}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
        >
          {SPEEDS.map((speed, index) => (
            <option key={speed.label} value={index}>
              {speed.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
