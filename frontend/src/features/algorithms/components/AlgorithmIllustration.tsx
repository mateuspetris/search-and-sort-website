import type { ReactElement } from 'react';
import type { AlgorithmId } from '../../../api/types';
import styles from './AlgorithmIllustration.module.css';

const G = 'var(--green)';
const D = 'var(--green-dark)';
const Y = 'var(--yellow)';
const T = 'var(--green-tint)';

function Bar({ x, h, fill, className }: { x: number; h: number; fill: string; className?: string }) {
  return <rect className={className} x={x} y={88 - h} width="12" height={h} rx="2" fill={fill} />;
}

const ILLUSTRATIONS: Record<AlgorithmId, () => ReactElement> = {
  'bubble-sort': () => (
    <>
      <circle cx="30" cy="60" r="11" fill={T} />
      <g className={styles.swapA}>
        <circle cx="62" cy="60" r="15" fill={Y} />
      </g>
      <g className={styles.swapB}>
        <circle cx="98" cy="60" r="9" fill={G} />
      </g>
      <circle cx="130" cy="60" r="18" fill={D} />
      <path d="M64 36 Q80 20 96 36" fill="none" stroke={D} strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M96 84 Q80 98 64 84" fill="none" stroke={D} strokeWidth="2" markerEnd="url(#arrow)" />
    </>
  ),
  'selection-sort': () => (
    <>
      <Bar x={20} h={20} fill={G} />
      <Bar x={40} h={30} fill={G} />
      <Bar x={64} h={62} fill={T} />
      <Bar x={84} h={48} fill={T} />
      <Bar x={104} h={14} fill={Y} className={styles.lift} />
      <Bar x={124} h={40} fill={T} />
      <path d="M62 12 H138" stroke={D} strokeWidth="2" strokeDasharray="3 4" className={styles.scan} />
      <path d="M110 20 V64" stroke={D} strokeWidth="1.5" markerEnd="url(#arrow)" />
    </>
  ),
  'insertion-sort': () => (
    <>
      <Bar x={20} h={20} fill={G} />
      <Bar x={40} h={34} fill={G} />
      <Bar x={82} h={50} fill={G} />
      <Bar x={102} h={64} fill={G} />
      <Bar x={132} h={44} fill={T} />
      <g className={styles.lift}>
        <rect x="61" y="8" width="12" height="40" rx="2" fill={Y} />
      </g>
      <path d="M67 54 V78" stroke={D} strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
    </>
  ),
  'merge-sort': () => (
    <>
      <rect x="40" y="10" width="80" height="12" rx="2" fill={T} />
      <rect x="18" y="44" width="50" height="12" rx="2" fill={Y} className={styles.splitLeft} />
      <rect x="92" y="44" width="50" height="12" rx="2" fill={Y} className={styles.splitRight} />
      <rect x="40" y="78" width="80" height="12" rx="2" fill={D} />
      <path d="M60 24 L43 42 M100 24 L117 42 M43 58 L60 76 M117 58 L100 76" stroke={D} strokeWidth="1.5" />
    </>
  ),
  'quick-sort': () => (
    <>
      <Bar x={14} h={18} fill={T} />
      <Bar x={32} h={30} fill={T} />
      <Bar x={50} h={24} fill={T} />
      <g className={styles.lift}>
        <Bar x={74} h={46} fill={Y} />
      </g>
      <path d="M80 12 V94" stroke={D} strokeWidth="2" strokeDasharray="4 4" />
      <Bar x={98} h={58} fill={G} />
      <Bar x={116} h={76} fill={G} />
      <Bar x={134} h={64} fill={G} />
    </>
  ),
  'shell-sort': () => (
    <>
      <Bar x={16} h={24} fill={G} />
      <Bar x={36} h={60} fill={T} />
      <Bar x={56} h={40} fill={T} />
      <Bar x={76} h={70} fill={Y} className={styles.lift} />
      <Bar x={96} h={30} fill={T} />
      <Bar x={116} h={50} fill={T} />
      <Bar x={136} h={18} fill={Y} className={styles.lift} />
      <path d="M142 40 Q112 -4 82 12" fill="none" stroke={D} strokeWidth="2" markerEnd="url(#arrow)" className={styles.scan} />
    </>
  ),
  'heap-sort': () => (
    <>
      <path d="M80 22 L46 52 M80 22 L114 52 M46 52 L28 82 M46 52 L64 82 M114 52 L132 82" stroke={D} strokeWidth="1.5" />
      <g className={styles.lift}>
        <circle cx="80" cy="22" r="13" fill={Y} stroke={D} strokeWidth="1.5" />
      </g>
      <circle cx="46" cy="52" r="10" fill={G} />
      <circle cx="114" cy="52" r="9" fill={G} />
      <circle cx="28" cy="82" r="7" fill={T} />
      <circle cx="64" cy="82" r="6" fill={T} />
      <circle cx="132" cy="82" r="5" fill={T} />
    </>
  ),
  'cocktail-shaker-sort': () => (
    <>
      <Bar x={22} h={16} fill={G} />
      <Bar x={44} h={34} fill={T} />
      <Bar x={66} h={48} fill={T} />
      <Bar x={88} h={40} fill={T} />
      <Bar x={110} h={58} fill={T} />
      <Bar x={132} h={74} fill={D} />
      <g className={styles.shake}>
        <path d="M30 8 H130" stroke={D} strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M130 22 H30" stroke={Y} strokeWidth="3" markerEnd="url(#arrow-yellow)" />
      </g>
    </>
  ),
};

interface AlgorithmIllustrationProps {
  id: AlgorithmId;
  size?: 'sm' | 'lg';
}

/** Ilustração geométrica que resume a ideia de cada algoritmo (design system, §6). */
export function AlgorithmIllustration({ id, size = 'sm' }: AlgorithmIllustrationProps) {
  const Illustration = ILLUSTRATIONS[id];
  return (
    <svg className={`${styles.illustration} ${styles[size]}`} viewBox="0 0 160 100" aria-hidden="true">
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill={D} />
        </marker>
        <marker id="arrow-yellow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--yellow-dark)" />
        </marker>
      </defs>
      <Illustration />
    </svg>
  );
}
