import type { AlgorithmContent } from './types';

export const heapSort: AlgorithmContent = {
  id: 'heap-sort',
  name: 'Heap Sort',
  tagline: 'Organiza o array como um Max Heap e retira o maior elemento repetidamente.',
  headlineComplexity: 'O(n log n)',
  simplicity: 'Baixa',
  intro: [
    'O Heap Sort é um algoritmo de ordenação eficiente que usa uma estrutura de dados chamada árvore heap (ou “árvore binária de seleção”). Ele constrói um heap máximo, em que o maior elemento está sempre no topo, e remove esse topo de forma ordenada.',
    'Uma heap é uma árvore binária em que a maior chave está sempre na raiz. O sucessor à esquerda do elemento de índice i é o de índice 2i + 1 e o sucessor à direita é o de índice 2i + 2, e a chave de cada nó é maior ou igual às chaves dos filhos: V[i] ≥ V[2i + 1] e V[i] ≥ V[2i + 2]. Por exemplo, o vetor [35, 23, 18, 11, 15, 9, 13] é uma heap.',
  ],
  howItWorks: [
    'Monte a heap. A transformação é feita do último nível da árvore para a raiz, colocando em cada nó o elemento de maior chave entre ele e seus filhos.',
    'Troque o elemento da raiz, que tem a maior chave, com o elemento da última posição do vetor.',
    'Isole esse elemento: ele já está na posição final e sai da heap.',
    'Refaça a heap com os elementos restantes e repita o processo até sobrar um único elemento.',
  ],
  example: [
    { values: [35, 64, 41, 72, 55, 28, 30, 59, 77, 50], highlight: [3, 7, 8], note: 'A montagem começa no último nó com filhos: o 55 já é maior que o filho 50. Em seguida o 72 é comparado com os filhos 59 e 77, e o 77 sobe.' },
    { values: [77, 72, 41, 64, 55, 28, 30, 59, 35, 50], highlight: [0], note: 'Heap montada: cada nó é maior ou igual aos filhos e a maior chave, 77, está na raiz.' },
    { values: [50, 72, 41, 64, 55, 28, 30, 59, 35, 77], highlight: [0, 9], note: 'A raiz troca com a última posição: o 77 está no lugar e sai da heap.' },
    { values: [72, 64, 41, 59, 55, 28, 30, 50, 35, 77], highlight: [0], note: 'A heap é refeita: o 50 desce e o 72 chega à raiz.' },
    { values: [64, 59, 41, 50, 55, 28, 30, 35, 72, 77], highlight: [0, 8, 9], note: 'Depois da 2ª troca e de refazer a heap, o 72 também está no lugar. O processo se repete até o fim.' },
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
    input: 'reversed',
    title: 'Vetor em ordem decrescente',
    explanation: 'Um vetor em ordem decrescente já é uma heap: a montagem não move nada. Como a complexidade não é simples de calcular, o material dá o custo do caso médio: C(n) = O(n log n) e M(n) = O(n log n).',
    cost: { comparisons: 'O(n log n)', movements: 'O(n log n)' },
  },
  worstCase: {
    input: 'sorted',
    title: 'Vetor em ordem crescente',
    explanation: 'Na montagem da heap, todo nó é menor que os filhos e precisa descer. Mesmo assim a altura da heap é log n, e o custo continua O(n log n): compare as entradas ordenada e invertida no laboratório.',
    cost: { comparisons: 'O(n log n)', movements: 'O(n log n)' },
  },
  whenToUse: [
    'Quando é preciso garantir O(n log n) sem memória extra.',
    'Como base para filas de prioridade e para encontrar os k maiores elementos.',
  ],
  whenToAvoid: [
    'Quando a estabilidade importa: o algoritmo não é estável.',
    'Em arquivos com poucos registros, por causa do tempo necessário para construir a heap.',
  ],
  comparisons: [
    { with: 'quick-sort', text: 'O Quick Sort costuma ser mais rápido, mas pode degradar para O(n²); o Heap Sort nunca degrada.' },
    { with: 'merge-sort', text: 'Mesma garantia O(n log n); o Merge Sort é estável, o Heap Sort não usa memória extra.' },
    { with: 'selection-sort', text: 'Mesma ideia de selecionar o extremo, com um heap no lugar da busca linear.' },
  ],
};
