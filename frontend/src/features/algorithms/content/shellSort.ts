import type { AlgorithmContent } from './types';

export const shellSort: AlgorithmContent = {
  id: 'shell-sort',
  name: 'Shell Sort',
  tagline: 'Um Insertion Sort que começa com saltos grandes e vai reduzindo a distância até 1.',
  headlineComplexity: 'O(n²) no pior caso',
  simplicity: 'Média',
  intro: [
    'O maior problema do Insertion Sort é mover um elemento para longe: ele anda uma posição por vez. O Shell Sort resolve isso ordenando primeiro elementos distantes entre si.',
    'A distância entre os elementos comparados se chama gap. Esta implementação usa a sequência original de Shell: n/2, n/4, …, 1. A complexidade depende diretamente dessa escolha.',
  ],
  howItWorks: [
    'Comece com gap = n/2.',
    'Faça um Insertion Sort considerando apenas elementos a gap posições de distância.',
    'Divida o gap por 2 e repita.',
    'Com gap = 1, o último passo é um Insertion Sort comum sobre um array que já está quase ordenado.',
  ],
  example: [
    { values: [6, 5, 4, 3, 2, 1], highlight: [0, 3], note: 'Gap 3: compara elementos a 3 posições de distância (6 e 3, 5 e 2, 4 e 1).' },
    { values: [3, 2, 1, 6, 5, 4], highlight: [0, 1, 2], note: 'Depois do gap 3, os valores pequenos já saltaram para a metade esquerda.' },
    { values: [3, 2, 1, 6, 5, 4], note: 'Gap 1: um Insertion Sort comum, com poucos deslocamentos restantes.' },
    { values: [1, 2, 3, 4, 5, 6], note: 'Array ordenado.' },
  ],
  code: `
public void shellsort (){
    int i, j, h, temp;

    h = 1;
    do{
        h = 3*h+1;
    }while (h < this.quant);

    do{
        h = h/3;
        for (i=h; i < this.quant; i++){
            temp = this.lista[i];
            j = i;
            while (this.lista[j-h] > temp){
                this.lista[j] = this.lista[j-h];
                j -= h;
                if (j < h) {
                    break;
                }
            }
            this.lista [j] = temp;
        }
    }while (h != 1);
}`,
  codeNotes: [
    {
      title: 'Insertion Sort com gap',
      text: 'O corpo é o Insertion Sort com 1 trocado por h. Quando h chega a 1, o código é literalmente o Insertion Sort. O if (j < h) break impede que j − h fique negativo.',
    },
    {
      title: 'Sequência de Knuth neste código',
      text: 'O primeiro do-while calcula h = 3h + 1 (1, 4, 13, 40, 121…) até passar do tamanho, e o segundo divide por 3 a cada rodada. Com essa sequência o pior caso cai para O(n^1,5).',
    },
    {
      title: 'No laboratório: n/2, n/4, …, 1',
      text: 'O laboratório, a tabela de tempos e as complexidades desta página usam a sequência original de Shell, que divide o gap por 2. Por isso a quantidade de rodadas e de comparações no laboratório é diferente da que este código faria.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'Em cada gap, toda chave é comparada uma única vez. São cerca de log n rodadas com n comparações: O(n log n).',
  },
  worstCase: {
    input: null,
    title: 'Entradas construídas contra a sequência',
    explanation: 'Com gaps que são potências de 2, é possível montar entradas em que as rodadas iniciais não ajudam e o último gap faz trabalho quadrático. Inverter o array não é suficiente para isso: compare as entradas aleatória e invertida no laboratório.',
  },
  whenToUse: [
    'Quando se quer algo bem melhor que O(n²) na prática, sem recursão e sem memória extra.',
    'Em sistemas embarcados ou com pilha limitada.',
  ],
  whenToAvoid: ['Quando a estabilidade é necessária.', 'Quando é preciso uma garantia formal de desempenho no pior caso.'],
  comparisons: [
    { with: 'insertion-sort', text: 'É a base do Shell Sort; os gaps grandes eliminam a maior fraqueza do Insertion Sort.' },
    { with: 'heap-sort', text: 'Também é in-place e sem recursão, mas o Heap Sort garante O(n log n).' },
    { with: 'quick-sort', text: 'O Quick Sort costuma ser mais rápido em arrays grandes, mas depende de recursão.' },
  ],
};
