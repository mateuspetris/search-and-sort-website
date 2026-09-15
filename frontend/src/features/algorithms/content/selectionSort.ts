import type { AlgorithmContent } from './types';

export const selectionSort: AlgorithmContent = {
  id: 'selection-sort',
  name: 'Selection Sort',
  tagline: 'Procura o menor elemento do que falta ordenar e o coloca na próxima posição.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'O Selection Sort divide o array em duas partes: a da esquerda, já ordenada, e a da direita, ainda por ordenar.',
    'A cada rodada, ele percorre toda a parte da direita para selecionar o menor valor e o troca com a primeira posição dessa parte. Muitas comparações, poucas trocas.',
  ],
  howItWorks: [
    'Comece na posição 0 e assuma que ela contém o menor elemento.',
    'Percorra o restante do array; sempre que encontrar um valor menor, guarde sua posição.',
    'Ao fim da busca, troque o menor elemento encontrado com a posição atual — mesmo que ele já esteja lá.',
    'Avance para a próxima posição e repita até a penúltima.',
  ],
  example: [
    { values: [4, 2, 5, 1], highlight: [0], note: 'Posição 0: procurar o menor valor no restante do array.' },
    { values: [4, 2, 5, 1], highlight: [3], note: 'Depois de comparar todos, o menor é o 1, na posição 3.' },
    { values: [1, 2, 5, 4], highlight: [0, 3], note: 'O 1 troca de lugar com o 4.' },
    { values: [1, 2, 5, 4], highlight: [1], note: 'Posição 1: o 2 já é o menor do restante e troca consigo mesmo.' },
  ],
  code: `
public static void selectionSort(int[] array) {
    for (int i = 0; i < array.length - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        int temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
}`,
  codeNotes: [
    {
      title: 'Busca completa',
      text: 'O laço interno sempre percorre toda a parte não ordenada, mesmo que o array já esteja ordenado. Por isso o melhor caso também é O(n²).',
    },
    {
      title: 'Uma troca por rodada',
      text: 'A troca fica fora do laço interno: exatamente n − 1 trocas no total, mesmo quando o menor já está no lugar (troca consigo mesmo). Poucas movimentações, o que é útil quando escrever na memória é caro.',
    },
    {
      title: 'Por que não é estável',
      text: 'A troca pode levar um elemento para depois de outro igual a ele. Em [2a, 2b, 1], o 2a troca com o 1 e termina depois do 2b.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'As n(n − 1)/2 comparações e as n − 1 trocas continuam acontecendo: o algoritmo não tem como saber que já terminou.',
  },
  worstCase: {
    input: 'reversed',
    title: 'Qualquer entrada',
    explanation: 'Comparações e trocas são sempre as mesmas em qualquer entrada — por isso, no quadro de Wirth, o Selection Sort tem tempos quase iguais nas três colunas.',
  },
  whenToUse: [
    'Para ensinar a ideia de “selecionar o menor” e a diferença entre comparações e trocas.',
    'Quando cada escrita é muito cara e o número de elementos é pequeno.',
  ],
  whenToAvoid: [
    'Em arrays quase ordenados: ele não aproveita nenhuma ordem prévia.',
    'Quando a estabilidade importa.',
  ],
  comparisons: [
    { with: 'insertion-sort', text: 'Ambos são O(n²), mas o Insertion Sort chega a O(n) em dados quase ordenados e é estável.' },
    { with: 'heap-sort', text: 'O Heap Sort segue a mesma ideia de selecionar um extremo, mas usa um heap para encontrá-lo em O(log n).' },
    { with: 'bubble-sort', text: 'Os dois fazem as mesmas comparações, mas o Bubble Sort pode fazer até n(n − 1)/2 trocas contra as n − 1 do Selection Sort.' },
  ],
};
