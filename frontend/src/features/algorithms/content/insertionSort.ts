import type { AlgorithmContent } from './types';

export const insertionSort: AlgorithmContent = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  tagline: 'Pega um elemento de cada vez e o insere na posição correta entre os já ordenados.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'O Insertion Sort funciona como organizar cartas na mão: você pega a próxima carta e a desliza para a esquerda até encontrar o lugar certo.',
    'Em vez de trocar pares, ele desloca os elementos maiores uma posição para a direita, abrindo espaço para o elemento que está sendo inserido.',
  ],
  howItWorks: [
    'Considere o primeiro elemento como uma parte já ordenada.',
    'Guarde o próximo elemento (a chave).',
    'Enquanto o elemento à esquerda for maior que a chave, desloque-o uma posição para a direita.',
    'Coloque a chave no espaço aberto e repita com o próximo elemento.',
  ],
  example: [
    { values: [2, 5, 3, 1], highlight: [2], note: 'Chave = 3. A parte ordenada à esquerda é [2, 5].' },
    { values: [2, 5, 5, 1], highlight: [2], note: '5 > 3: o 5 é deslocado uma posição para a direita.' },
    { values: [2, 3, 5, 1], highlight: [1], note: '2 ≤ 3: posição encontrada, o 3 é inserido.' },
    { values: [1, 2, 3, 5], highlight: [0], note: 'Com a chave 1, todos são deslocados e ele vai para o início.' },
  ],
  code: `
public static void insertionSort(int[] array) {
    for (int i = 1; i < array.length; i++) {
        int key = array[i];
        int j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]; // desloca para a direita
            j--;
        }

        array[j + 1] = key;
    }
}`,
  codeNotes: [
    {
      title: 'A chave fica guardada',
      text: 'key guarda o valor enquanto os maiores são deslocados. Durante o deslocamento, o array mostra um valor repetido por um instante — é esperado.',
    },
    {
      title: 'Parada natural',
      text: 'O while termina assim que encontra um elemento menor ou igual. Em dados ordenados, isso acontece na primeira comparação: melhor caso O(n).',
    },
    {
      title: 'Deslocar em vez de trocar',
      text: 'Cada deslocamento é uma única escrita, enquanto uma troca exige três. Por isso o laboratório mostra 0 trocas para este algoritmo.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'Cada chave é comparada uma única vez com o vizinho da esquerda e nenhum deslocamento acontece: n − 1 comparações.',
  },
  worstCase: {
    input: 'reversed',
    title: 'Array em ordem inversa',
    explanation: 'Cada chave precisa atravessar toda a parte ordenada até o início: n(n − 1)/2 comparações e deslocamentos.',
  },
  whenToUse: [
    'Em arrays pequenos — muitas bibliotecas usam Insertion Sort abaixo de algumas dezenas de elementos.',
    'Em dados quase ordenados ou que chegam aos poucos e precisam permanecer ordenados.',
    'Quando estabilidade e memória O(1) são necessárias.',
  ],
  whenToAvoid: ['Em grandes volumes de dados desordenados.'],
  comparisons: [
    { with: 'shell-sort', text: 'O Shell Sort é um Insertion Sort com saltos maiores no início, o que reduz muito os deslocamentos.' },
    { with: 'bubble-sort', text: 'Mesma complexidade, mas o Insertion Sort faz menos escritas e costuma ser mais rápido.' },
    { with: 'merge-sort', text: 'O Merge Sort é O(n log n) em qualquer caso, mas precisa de memória extra e perde em arrays pequenos.' },
  ],
};
