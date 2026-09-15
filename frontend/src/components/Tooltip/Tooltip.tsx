import { useId, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  /** Termo exibido no texto. */
  children: ReactNode;
  /** Explicação curta do conceito. */
  content: string;
}

/** Explicação curta para conceitos técnicos, visível no hover e no foco do teclado. */
export function Tooltip({ children, content }: TooltipProps) {
  const id = useId();
  return (
    <span className={styles.wrapper}>
      <span className={styles.term} tabIndex={0} aria-describedby={id}>
        {children}
      </span>
      <span role="tooltip" id={id} className={styles.bubble}>
        {content}
      </span>
    </span>
  );
}
