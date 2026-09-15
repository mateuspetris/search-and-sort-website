import { Button } from '../Button/Button';
import styles from './StatusMessage.module.css';

export function LoadingMessage({ label = 'Carregando…' }: { label?: string }) {
  return (
    <p className={styles.loading} role="status">
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </p>
  );
}

export function ErrorMessage({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <div className={styles.error} role="alert">
      <p>{error.message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
