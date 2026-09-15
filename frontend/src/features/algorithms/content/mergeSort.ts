import type { AlgorithmContent } from './types';

export const mergeSort: AlgorithmContent = {
  id: 'merge-sort',
  name: 'Merge Sort',
  tagline: 'Divide o array ao meio até sobrarem pedaços triviais e depois os mescla em ordem.',
  headlineComplexity: 'O(n log n)',
  simplicity: 'Média',
  intro: [
    'O Merge Sort aplica a estratégia de dividir para conquistar: um problema grande vira dois problemas menores, resolvidos da mesma forma.',
    'A parte inteligente está na mesclagem: juntar duas listas já ordenadas é fácil, basta comparar sempre o primeiro elemento de cada uma.',
  ],
  howItWorks: [
    'Se o intervalo tem um único elemento, ele já está ordenado.',
    'Divida o intervalo ao meio e ordene cada metade recursivamente.',
    'Copie o intervalo para um array auxiliar.',
    'Compare o primeiro elemento restante de cada metade e escreva o menor no array original; repita até esgotar as metades.',
  ],
  example: [
    { values: [4, 1, 3, 2], splits: [1], note: 'O array é dividido ao meio.' },
    { values: [4, 1, 3, 2], splits: [0, 1, 2], note: 'A divisão continua até restarem elementos isolados.' },
    { values: [1, 4, 2, 3], splits: [1], highlight: [0, 1, 2, 3], note: 'Cada par é mesclado em ordem: [1, 4] e [2, 3].' },
    { values: [1, 2, 3, 4], note: 'As duas metades são mescladas comparando sempre os primeiros elementos.' },
  ],
  code: `
public static void mergeSort(int[] array) {
    mergeSort(array, new int[array.length], 0, array.length - 1);
}

private static void mergeSort(int[] array, int[] aux, int low, int high) {
    if (low >= high) {
        return;
    }
    int mid = low + (high - low) / 2;
    mergeSort(array, aux, low, mid);
    mergeSort(array, aux, mid + 1, high);
    merge(array, aux, low, mid, high);
}

private static void merge(int[] array, int[] aux, int low, int mid, int high) {
    System.arraycopy(array, low, aux, low, high - low + 1);

    int left = low, right = mid + 1;
    for (int k = low; k <= high; k++) {
        if (left > mid) {
            array[k] = aux[right++];
        } else if (right > high) {
            array[k] = aux[left++];
        } else if (aux[left] <= aux[right]) {
            array[k] = aux[left++];
        } else {
            array[k] = aux[right++];
        }
    }
}`,
  codeNotes: [
    {
      title: 'Um único array auxiliar',
      text: 'aux é criado uma vez e reutilizado em todas as mesclagens. É esse array que torna o espaço O(n) e o algoritmo não in-place.',
    },
    {
      title: 'mid sem overflow',
      text: 'low + (high - low) / 2 evita que low + high ultrapasse o limite de int em arrays enormes.',
    },
    {
      title: 'Estabilidade no <=',
      text: 'Em caso de empate, o elemento da metade esquerda vem primeiro. Trocar por < quebraria a estabilidade.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'A divisão é sempre a mesma, então continua O(n log n). Em cada mesclagem, a metade esquerda se esgota primeiro e há menos comparações.',
  },
  worstCase: {
    input: null,
    title: 'Elementos intercalados',
    explanation: 'Quando os elementos das duas metades se alternam (ex.: [1, 3] e [2, 4]), cada mesclagem compara quase todos eles. Ainda assim o custo é O(n log n) — no laboratório, a diferença entre os tipos de entrada é pequena.',
  },
  whenToUse: [
    'Quando é preciso garantir O(n log n) independentemente da entrada.',
    'Quando a ordenação precisa ser estável.',
    'Em listas encadeadas e ordenação externa (dados maiores que a memória).',
  ],
  whenToAvoid: ['Quando a memória extra O(n) é um problema.', 'Em arrays muito pequenos, onde o custo da recursão domina.'],
  comparisons: [
    { with: 'quick-sort', text: 'O Quick Sort costuma ser mais rápido e é in-place, mas tem pior caso O(n²) e não é estável.' },
    { with: 'heap-sort', text: 'O Heap Sort também garante O(n log n) e usa O(1) de memória, mas não é estável.' },
    { with: 'insertion-sort', text: 'Implementações reais combinam os dois: Insertion Sort para os pedaços pequenos da recursão.' },
  ],
};
