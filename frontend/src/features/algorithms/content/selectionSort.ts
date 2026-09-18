import type { AlgorithmContent } from './types';

export const selectionSort: AlgorithmContent = {
  id: 'selection-sort',
  name: 'Selection Sort',
  tagline: 'Procura o menor elemento do que falta ordenar e o coloca na próxima posição.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'A Seleção Direta (Selection Sort) é um algoritmo de ordenação simples e intuitivo, normalmente usado para fins educacionais. É um algoritmo de ordenação por comparação: seleciona repetidamente o menor (ou o maior) elemento da lista e o coloca na posição correta.',
    'O número de comparações é quadrático, enquanto o número de movimentações é linear: muitas comparações, poucas trocas.',
  ],
  howItWorks: [
    'Selecione o menor item do vetor.',
    'Troque-o com o item da primeira posição.',
    'Repita a operação com os n − 1 itens restantes.',
    'Depois com os n − 2 itens, e assim por diante, até que reste apenas 1 item.',
  ],
  example: [
    { values: [35, 64, 41, 72, 55, 28, 30, 49, 77, 50], highlight: [0, 5], note: 'O menor item do vetor é o 28, que vai trocar de lugar com o 35 da primeira posição.' },
    { values: [28, 64, 41, 72, 55, 35, 30, 49, 77, 50], highlight: [1, 6], note: 'Entre os n − 1 restantes, o menor é o 30: ele troca com o 64.' },
    { values: [28, 30, 41, 72, 55, 35, 64, 49, 77, 50], highlight: [2, 5], note: 'Entre os n − 2 restantes, o menor é o 35: ele troca com o 41.' },
    { values: [28, 30, 35, 72, 55, 41, 64, 49, 77, 50], highlight: [0, 1, 2], note: 'As três primeiras posições já estão definitivas. A seleção continua no restante do vetor.' },
    { values: [28, 30, 35, 41, 49, 50, 55, 64, 72, 77], note: 'Depois de n − 1 seleções e trocas, o vetor está ordenado.' },
  ],
  code: `
public void selectionSort (){
    int i, j, min, temp;
    for (i=0; i< this.quant-1;i++){
        min = i;
        for (j=i+1; j< this.quant; j++){
            if (this.lista[j] < this.lista[min]) {
                min = j;
            }
        }
        temp = this.lista[min];
        this.lista[min] = this.lista[i];
        this.lista[i] = temp;
    }
}`,
  codeNotes: [
    {
      title: 'Busca completa',
      text: 'O laço interno sempre percorre toda a parte não ordenada, mesmo que o array já esteja ordenado. Por isso o melhor caso também é O(n²).',
    },
    {
      title: 'Uma troca por rodada',
      text: 'A troca fica fora do laço interno: exatamente n − 1 trocas no total, mesmo quando min continua igual a i (troca consigo mesmo). Poucas movimentações, o que é útil quando escrever na memória é caro.',
    },
    {
      title: 'Por que não é estável',
      text: 'A troca pode levar um item para depois de outro com a mesma chave. Com os registros (1, Kátia), (2, Carlos), (3, Lucas), (4, José), (5, Lucas), (6, Júlia), ordenados por código, ordenar por nome deixa (5, Lucas) antes de (3, Lucas): a ordem por código entre os nomes iguais se perde.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Vetor já ordenado',
    explanation: 'Estar ordenado (ou quase) não ajuda em nada: o custo das comparações continua quadrático, n(n − 1)/2, e as n − 1 trocas continuam acontecendo.',
    cost: { comparisons: 'O(n²)', movements: 'O(n)' },
  },
  worstCase: {
    input: 'reversed',
    title: 'Qualquer ordem inicial',
    explanation: 'O Selection Sort não tem melhor nem pior caso: comparações e movimentações são as mesmas para qualquer entrada. Por isso, no quadro de Wirth, os tempos são quase iguais nas três colunas.',
    cost: { comparisons: 'O(n²)', movements: 'O(n)' },
  },
  whenToUse: [
    'Quando se quer um algoritmo simples de entender e implementar, que praticamente não requer memória extra.',
    'Em arquivos com registros grandes: como o número de movimentações é linear, poucos registros são copiados.',
    'Em arquivos com até cerca de 1000 registros, quando a chave tem o tamanho de 1 palavra.',
  ],
  whenToAvoid: [
    'Em arquivos já ordenados ou quase ordenados: isso não ajuda em nada, o custo das comparações continua quadrático.',
    'Quando a estabilidade importa: o algoritmo pode alterar a ordem de elementos iguais.',
  ],
  comparisons: [
    { with: 'insertion-sort', text: 'Ambos são O(n²), mas o Insertion Sort chega a O(n) em dados quase ordenados e é estável.' },
    { with: 'heap-sort', text: 'O Heap Sort segue a mesma ideia de selecionar um extremo, mas usa um heap para encontrá-lo em O(log n).' },
    { with: 'bubble-sort', text: 'Os dois fazem as mesmas comparações, mas o Bubble Sort pode fazer até n(n − 1)/2 trocas contra as n − 1 do Selection Sort.' },
  ],
};
