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
public void bubblesort (){
    int LSup, i, j, temp;

    LSup = this.quant-1;
    do{
        j = 0;
        for (i = 0; i < LSup; i++)
            if (this.lista[i] > this.lista[i+1]){
                temp = this.lista[i];
                this.lista[i] = this.lista[i+1];
                this.lista[i+1] = temp;
                j = i;
            }
        LSup = j;
    }while (LSup >= 1);
}`,
  codeNotes: [
    {
      title: 'Onde está a parada',
      text: 'j guarda a posição da última troca e vira o novo limite (LSup = j). Tudo depois dela já está ordenado; se uma passagem não troca nada, j fica 0 e o do-while termina. Com o array já ordenado, este código faz só n − 1 comparações.',
    },
    {
      title: 'No laboratório: sem parada',
      text: 'O laboratório e a tabela de tempos executam o Bubble Sort na forma básica, sem a parada: todas as n − 1 passagens são feitas e são sempre n(n − 1)/2 comparações. Assim os números mostram o custo do algoritmo em si, e não da otimização. Por isso, com entrada ordenada, o laboratório conta mais comparações do que este código faria.',
    },
    {
      title: 'Estabilidade',
      text: 'A troca só acontece com > (e não ≥), então elementos iguais nunca trocam de ordem entre si.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Array já ordenado',
    explanation: 'Na forma básica, usada no laboratório, nenhuma troca acontece, mas todas as n(n − 1)/2 comparações continuam sendo feitas: o custo cai só nas movimentações. Por isso o melhor caso também é O(n²). Com a parada do código acima, uma única passagem sem trocas bastaria: n − 1 comparações, O(n).',
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
