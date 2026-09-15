import { useId } from 'react';
import { MAX_ARRAY_SIZE } from '../../../api/types';
import { Button } from '../../../components/Button/Button';
import { INPUT_TYPES, MIN_SIZE, type InputType } from '../inputGenerators';
import styles from './Controls.module.css';

interface InputControlsProps {
  size: number;
  inputType: InputType;
  onSizeChange: (size: number) => void;
  onInputTypeChange: (type: InputType) => void;
  onRegenerate: () => void;
}

export function InputControls({ size, inputType, onSizeChange, onInputTypeChange, onRegenerate }: InputControlsProps) {
  const sizeId = useId();
  const typeId = useId();

  return (
    <div className={styles.group}>
      <label className={styles.field} htmlFor={sizeId}>
        <span className={styles.fieldLabel}>
          Elementos <output className={styles.output}>{size}</output>
        </span>
        <input
          id={sizeId}
          className={styles.range}
          type="range"
          min={MIN_SIZE}
          max={MAX_ARRAY_SIZE}
          value={size}
          onChange={(event) => onSizeChange(Number(event.target.value))}
        />
      </label>
      <label className={styles.field} htmlFor={typeId}>
        <span className={styles.fieldLabel}>Entrada</span>
        <select
          id={typeId}
          className={styles.select}
          value={inputType}
          onChange={(event) => onInputTypeChange(event.target.value as InputType)}
        >
          {INPUT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>
      <Button variant="ghost" size="sm" onClick={onRegenerate}>
        Gerar novos dados
      </Button>
    </div>
  );
}
