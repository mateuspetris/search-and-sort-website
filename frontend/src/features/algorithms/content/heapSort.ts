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
public void heapSort (){
    int dir = quant-1, esq = (dir-1)/2, temp;

    while (esq >= 0){
        refazHeap (esq, this.quant-1);
        esq--;
    } while (dir > 0){
        temp = this.lista[0];
        this.lista [0] = this.lista [dir];
        this.lista [dir] = temp;
        dir--;
        refazHeap(0, dir);
    }
}

private void refazHeap (int esq, int dir){
    int i = esq, mF = 2*i+1; // maior filho
    int raiz = this.lista[i];
    boolean heap = false;

    while ((mF <= dir) && (!heap)){
        if (mF < dir)
            if (this.lista[mF] < this.lista[mF+1])
                mF ++;
        if (raiz < this.lista[mF]) {
            this.lista[i] = this.lista[mF];
            i = mF;
            mF = 2*i+1;
        } else
            heap = true;
    }
    this.lista[i] = raiz;
}`,
  codeNotes: [
    {
      title: 'Construção do heap',
      text: 'O primeiro while começa em (dir − 1)/2, o último nó com filhos, e sobe até a raiz. As posições depois dele são folhas e já são heaps. Construir o heap assim custa O(n), não O(n log n).',
    },
    {
      title: 'refazHeap',
      text: 'raiz guarda o elemento de esq e mF aponta para o maior filho (2i + 1 ou o irmão à direita). Enquanto a raiz for menor que esse filho, o filho sobe para a posição i e a busca continua um nível abaixo; quando não for, heap vira true e o laço para. No fim, a raiz é escrita uma única vez no lugar que sobrou. O laboratório faz o mesmo percurso, mas com trocas.',
    },
    {
      title: 'dir encolhe',
      text: 'Depois de mover a raiz (o maior) para a posição dir, dir diminui: o final do array, já ordenado, fica fora do heap.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
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
