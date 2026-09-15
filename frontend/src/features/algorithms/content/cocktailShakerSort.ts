import type { AlgorithmContent } from './types';

export const cocktailShakerSort: AlgorithmContent = {
  id: 'cocktail-shaker-sort',
  name: 'Cocktail Shaker Sort',
  tagline: 'Um Bubble Sort de ida e volta: leva o maior para o fim e o menor para o início.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'Também chamado de Cocktail Sort, Shaker Sort ou Bubble Sort bidirecional. Ele alterna uma passagem da esquerda para a direita com outra da direita para a esquerda.',
    'Isso corrige uma fraqueza do Bubble Sort: elementos pequenos que estão no fim do array avançam só uma posição por passagem. Aqui, eles voltam de uma vez.',
  ],
  howItWorks: [
    'Passagem →: compare e troque vizinhos fora de ordem; o maior elemento chega ao fim.',
    'Passagem ←: faça o mesmo no sentido contrário; o menor elemento chega ao início.',
    'Estreite os limites nas duas pontas, pois elas já estão ordenadas.',
    'Repita até os limites se encontrarem. Na forma básica não há verificação de array já ordenado: todas as idas e voltas são feitas.',
  ],
  example: [
    { values: [2, 3, 4, 5, 1], highlight: [3, 4], note: 'Passagem →: só na última comparação aparece algo fora de ordem (5 > 1).' },
    { values: [2, 3, 4, 1, 5], highlight: [3], note: 'Aqui o Bubble Sort precisaria de mais três passagens para levar o 1 ao início.' },
    { values: [1, 2, 3, 4, 5], highlight: [0], note: 'Passagem ←: o 1 volta até o início em uma única passagem.' },
  ],
  code: `
public static void cocktailShakerSort(int[] array) {
    int start = 0;
    int end = array.length - 1;

    while (start < end) {
        for (int j = start; j < end; j++) {          // passagem →
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
        end--;

        for (int j = end - 1; j >= start; j--) {     // passagem ←
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
        start++;
    }
}

private static void swap(int[] array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}`,
  codeNotes: [
    {
      title: 'Dois limites',
      text: 'end diminui depois da passagem → e start aumenta depois da passagem ←: as duas pontas vão sendo fixadas.',
    },
    {
      title: 'Sem parada antecipada',
      text: 'O laço só termina quando start alcança end: são sempre n(n − 1)/2 comparações, mesmo com o array ordenado. Variantes otimizadas param quando uma passagem não troca nada.',
    },
    {
      title: 'Mesma comparação nos dois sentidos',
      text: 'Nas duas direções compara-se array[j] > array[j + 1] e troca-se só quando é estritamente maior. Isso mantém o algoritmo estável.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'Nenhuma troca acontece, mas todas as idas e voltas são percorridas: n(n − 1)/2 comparações. O melhor caso também é O(n²).',
  },
  worstCase: {
    input: 'reversed',
    title: 'Array em ordem inversa',
    explanation: 'Todas as comparações geram trocas: n(n − 1)/2 comparações e o mesmo número de trocas, exatamente como o Bubble Sort.',
  },
  whenToUse: [
    'Para mostrar como uma pequena mudança melhora o Bubble Sort em certos casos.',
    'Em arrays pequenos com poucos elementos fora do lugar nas duas pontas.',
  ],
  whenToAvoid: ['Em grandes volumes de dados: a complexidade continua quadrática.'],
  comparisons: [
    { with: 'bubble-sort', text: 'Em entradas como [2, 3, 4, 5, 1], o Bubble Sort precisa de uma passagem por posição para trazer o 1; aqui basta uma volta.' },
    { with: 'insertion-sort', text: 'Em geral o Insertion Sort ainda faz menos operações para o mesmo resultado.' },
  ],
};
