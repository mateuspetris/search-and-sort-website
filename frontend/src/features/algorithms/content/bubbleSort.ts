import type { AlgorithmContent } from './types';

export const bubbleSort: AlgorithmContent = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  tagline: 'Compara vizinhos e troca quando estão fora de ordem, até que os maiores “borbulhem” para o fim.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'O Bubble Sort é o algoritmo de ordenação mais direto: percorre o array comparando cada par de elementos vizinhos e troca os dois sempre que o da esquerda é maior.',
    'Ao final de cada passagem, o maior elemento ainda fora do lugar chega à sua posição definitiva como uma bolha subindo até a superfície.',
  ],
  howItWorks: [
    'Compare os elementos das posições 0 e 1; se estiverem fora de ordem, troque-os.',
    'Avance uma posição e repita a comparação até o fim da parte não ordenada.',
    'Ao fim da passagem, o maior elemento está na última posição e não precisa mais ser considerado.',
    'Repita as passagens n − 1 vezes. Na forma básica o algoritmo não verifica se o array já ficou ordenado: todas as passagens são feitas.',
  ],
  example: [
    { values: [5, 1, 4, 2], highlight: [0, 1], note: '5 > 1: os vizinhos estão fora de ordem e são trocados.' },
    { values: [1, 5, 4, 2], highlight: [1, 2], note: '5 > 4: nova troca.' },
    { values: [1, 4, 5, 2], highlight: [2, 3], note: '5 > 2: mais uma troca.' },
    { values: [1, 4, 2, 5], highlight: [3], note: 'Fim da 1ª passagem: o 5 chegou à posição final.' },
  ],
  code: `
public static void bubbleSort(int[] array) {
    for (int pass = 0; pass < array.length - 1; pass++) {
        for (int j = 0; j < array.length - 1 - pass; j++) {
            if (array[j] > array[j + 1]) {
                int temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}`,
  codeNotes: [
    {
      title: 'Limite do laço interno',
      text: 'array.length - 1 - pass ignora as últimas posições, que já receberam os maiores elementos nas passagens anteriores.',
    },
    {
      title: 'Sem parada antecipada',
      text: 'Os dois laços sempre executam por completo: são sempre n(n − 1)/2 comparações, com o array ordenado ou não. Uma variante comum adiciona uma flag para parar quando uma passagem não troca nada, mas essa é uma otimização, não o algoritmo básico.',
    },
    {
      title: 'Estabilidade',
      text: 'A troca só acontece com > (e não ≥), então elementos iguais nunca trocam de ordem entre si.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'Nenhuma troca acontece, mas todas as n(n − 1)/2 comparações continuam sendo feitas: o custo cai só nas movimentações. Por isso o melhor caso também é O(n²).',
  },
  worstCase: {
    input: 'reversed',
    title: 'Array em ordem inversa',
    explanation: 'Cada comparação resulta em troca: n(n − 1)/2 comparações e o mesmo número de trocas, ou seja, 3 × n(n − 1)/2 movimentações.',
  },
  whenToUse: [
    'Para aprender e explicar os conceitos de comparação, troca e estabilidade.',
    'Como referência de pior desempenho ao comparar algoritmos, como no quadro de Wirth.',
  ],
  whenToAvoid: [
    'Em qualquer volume de dados relevante: o número de trocas cresce de forma quadrática.',
    'Quando existe uma biblioteca de ordenação disponível — ela sempre será melhor.',
  ],
  comparisons: [
    { with: 'insertion-sort', text: 'Mesma complexidade, mas o Insertion Sort costuma fazer bem menos escritas e é mais rápido na prática.' },
    { with: 'cocktail-shaker-sort', text: 'Variação bidirecional que resolve a lentidão do Bubble Sort para mover elementos pequenos que estão no fim.' },
    { with: 'selection-sort', text: 'Os dois fazem sempre n(n − 1)/2 comparações, mas o Selection Sort faz só n − 1 trocas; em compensação, não é estável.' },
  ],
};
