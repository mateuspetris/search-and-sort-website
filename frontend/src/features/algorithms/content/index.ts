import type { AlgorithmId } from '../../../api/types';
import { bubbleSort } from './bubbleSort';
import { cocktailShakerSort } from './cocktailShakerSort';
import { heapSort } from './heapSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { selectionSort } from './selectionSort';
import { shellSort } from './shellSort';
import type { AlgorithmContent } from './types';

/** Mesma ordem de GET /api/algorithms. */
export const ALGORITHMS: AlgorithmContent[] = [
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  shellSort,
  heapSort,
  cocktailShakerSort,
];

const BY_ID = new Map(ALGORITHMS.map((content) => [content.id, content]));

export function isAlgorithmId(value: string | undefined): value is AlgorithmId {
  return value !== undefined && BY_ID.has(value as AlgorithmId);
}

export function getAlgorithmContent(id: AlgorithmId): AlgorithmContent {
  return BY_ID.get(id)!;
}

export type { AlgorithmContent, CaseCost, CaseExample, ExampleFrame } from './types';
