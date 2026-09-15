export type InputType = 'random' | 'sorted' | 'reversed' | 'nearly-sorted';

export const INPUT_TYPES: { value: InputType; label: string }[] = [
  { value: 'random', label: 'Aleatória' },
  { value: 'sorted', label: 'Já ordenada' },
  { value: 'reversed', label: 'Invertida' },
  { value: 'nearly-sorted', label: 'Quase ordenada' },
];

export const MIN_SIZE = 5;
export const DEFAULT_SIZE = 16;

type RandomFn = () => number;

/** Gera uma entrada com os valores 1..size organizados conforme o tipo escolhido. */
export function generateInput(type: InputType, size: number, random: RandomFn = Math.random): number[] {
  const sorted = Array.from({ length: size }, (_, i) => i + 1);
  switch (type) {
    case 'sorted':
      return sorted;
    case 'reversed':
      return sorted.reverse();
    case 'random':
      return shuffle(sorted, random);
    case 'nearly-sorted':
      return nearlySorted(sorted, random);
  }
}

function shuffle(values: number[], random: RandomFn): number[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    swap(result, i, j);
  }
  return result;
}

/** Troca cerca de 10% dos elementos com um vizinho próximo (ao menos uma troca). */
function nearlySorted(values: number[], random: RandomFn): number[] {
  const result = [...values];
  if (result.length < 2) {
    return result;
  }
  const swaps = Math.max(1, Math.round(result.length * 0.1));
  for (let n = 0; n < swaps; n++) {
    const i = Math.floor(random() * (result.length - 1));
    const distance = 1 + Math.floor(random() * 2);
    swap(result, i, Math.min(result.length - 1, i + distance));
  }
  return result;
}

function swap(values: number[], i: number, j: number) {
  const tmp = values[i]!;
  values[i] = values[j]!;
  values[j] = tmp;
}
