import type { AlgorithmContent } from './types';

export const heapSort: AlgorithmContent = {
  id: 'heap-sort',
  name: 'Heap Sort',
  tagline: 'Organiza o array como um Max Heap e retira o maior elemento repetidamente.',
  headlineComplexity: 'O(n log n)',
  simplicity: 'Baixa',
  intro: [
    'Um Max Heap é uma árvore binária em que cada pai é maior ou igual aos filhos — logo, o maior elemento está sempre na raiz.',
    'O Heap Sort guarda essa árvore dentro do próprio array: os filhos da posição i ficam em 2i + 1 e 2i + 2. Sem estrutura extra, sem memória adicional.',
  ],
  howItWorks: [
    'Transforme o array em um Max Heap, aplicando heapify dos últimos pais até a raiz.',
    'Troque a raiz (o maior elemento) com a última posição do heap.',
    'Reduza o tamanho do heap em 1: aquela posição já está ordenada.',
    'Aplique heapify na raiz para restaurar o heap e repita até sobrar um elemento.',
  ],
  example: [
    { values: [2, 5, 3, 4], highlight: [0], note: 'O array é visto como uma árvore: 2 é a raiz; 5 e 3 são seus filhos; 4 é filho do 5.' },
    { values: [5, 4, 3, 2], highlight: [0], note: 'Depois de construir o Max Heap, o maior valor está na raiz.' },
    { values: [2, 4, 3, 5], highlight: [0, 3], note: 'A raiz vai para o fim e o heap passa a ter 3 elementos.' },
    { values: [4, 2, 3, 5], highlight: [0], note: 'O heapify faz o 4 subir para a raiz, e o processo se repete.' },
  ],
  code: `
public static void heapSort(int[] array) {
    for (int root = array.length / 2 - 1; root >= 0; root--) {
        heapify(array, root, array.length);
    }

    for (int end = array.length - 1; end > 0; end--) {
        swap(array, 0, end);      // maior elemento vai para o fim
        heapify(array, 0, end);   // heap diminui em 1
    }
}

private static void heapify(int[] array, int root, int size) {
    while (true) {
        int largest = root;
        int left = 2 * root + 1;
        int right = 2 * root + 2;

        if (left < size && array[left] > array[largest]) largest = left;
        if (right < size && array[right] > array[largest]) largest = right;
        if (largest == root) return;

        swap(array, root, largest);
        root = largest;
    }
}

private static void swap(int[] array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}`,
  codeNotes: [
    {
      title: 'Construção em O(n)',
      text: 'O primeiro laço começa em length/2 − 1 porque as posições seguintes são folhas. Construir o heap assim custa O(n), não O(n log n).',
    },
    {
      title: 'heapify iterativo',
      text: 'O elemento desce trocando com o maior filho até que nenhum filho seja maior. A altura da árvore limita isso a O(log n) trocas.',
    },
    {
      title: 'size',
      text: 'O parâmetro size faz o heapify ignorar o final do array, onde os maiores elementos já estão ordenados.',
    },
  ],
  bestCase: {
    input: null,
    title: 'Praticamente qualquer entrada',
    explanation: 'Cada uma das n extrações chama heapify na raiz, que desce até log n níveis. A entrada muda pouco o total — teste as entradas ordenada e invertida no laboratório.',
  },
  worstCase: {
    input: null,
    title: 'Também O(n log n)',
    explanation: 'Não existe entrada que degrade o Heap Sort: a altura do heap é sempre log n. O custo é ter mais comparações e trocas que o Quick Sort na média.',
  },
  whenToUse: [
    'Quando é preciso garantir O(n log n) sem memória extra.',
    'Como base para filas de prioridade e para encontrar os k maiores elementos.',
  ],
  whenToAvoid: [
    'Quando a estabilidade importa.',
    'Quando o desempenho médio é o mais importante: o acesso “saltado” à memória costuma deixá-lo mais lento que o Quick Sort.',
  ],
  comparisons: [
    { with: 'quick-sort', text: 'O Quick Sort costuma ser mais rápido, mas pode degradar para O(n²); o Heap Sort nunca degrada.' },
    { with: 'merge-sort', text: 'Mesma garantia O(n log n); o Merge Sort é estável, o Heap Sort não usa memória extra.' },
    { with: 'selection-sort', text: 'Mesma ideia de selecionar o extremo, com um heap no lugar da busca linear.' },
  ],
};
