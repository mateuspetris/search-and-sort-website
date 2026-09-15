import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  muted?: boolean;
}

/** Bloco vertical da narrativa das páginas: rótulo, título, texto de apoio e conteúdo. */
export function Section({ id, eyebrow, title, lead, children, muted = false }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${muted ? styles.muted : ''}`}>
      <div className={styles.inner}>
        {(eyebrow || title || lead) && (
          <header className={styles.header}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {lead && <p className={styles.lead}>{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
