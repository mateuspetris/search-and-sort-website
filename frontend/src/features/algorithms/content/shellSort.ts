import type { AlgorithmContent } from './types';

export const shellSort: AlgorithmContent = {
  id: 'shell-sort',
  name: 'Shell Sort',
  tagline: 'Um Insertion Sort que começa com saltos grandes e vai reduzindo a distância até 1.',
  headlineComplexity: 'O(n²) no pior caso',
  simplicity: 'Média',
  intro: [
    'O Shell Sort é um melhoramento do Insertion Sort, especialmente para vetores grandes. Ele compara elementos distantes entre si, permitindo que os valores sejam deslocados mais rapidamente para suas posições corretas.',
    'O vetor é dividido em subvetores menores, usando um espaçamento h entre os elementos comparados. No início h é grande; a cada etapa ele diminui, até chegar a 1, quando o algoritmo se comporta como um Insertion Sort.',
    'Como escolher os incrementos? Experimentos mostraram que cada incremento não deve ser múltiplo do anterior. Knuth mostrou, experimentalmente, que a sequência 1, 4, 13, 40, 121, … — h(s) = 3h(s − 1) + 1, com h(1) = 1 — melhora o tempo de execução em cerca de 20%.',
  ],
  howItWorks: [
    'Compare os elementos separados por h e ordene-os, como um Insertion Sort que anda de h em h.',
    'Reduza o h e repita a ordenação.',
    'Continue até que h seja igual a 1.',
    'No final, com h = 1, é feito um Insertion Sort comum sobre um vetor que já está quase ordenado, e o vetor fica ordenado.',
  ],
  example: [
    { values: [520, 450, 254, 310, 285, 179, 652, 351, 423, 161], highlight: [0, 4, 8], note: 'h = 4: são ordenados os subvetores de elementos a 4 posições de distância, como 520, 285 e 423.' },
    { values: [285, 161, 254, 310, 423, 179, 652, 351, 520, 450], highlight: [0, 2, 4, 6, 8], note: 'Depois de h = 4, os valores pequenos já saltaram para a esquerda. Agora h = 2: posições pares e ímpares são ordenadas separadamente.' },
    { values: [254, 161, 285, 179, 423, 310, 520, 351, 652, 450], note: 'Depois de h = 2, o vetor está quase ordenado. Com h = 1, sobra um Insertion Sort com poucos deslocamentos.' },
    { values: [161, 179, 254, 285, 310, 351, 423, 450, 520, 652], note: 'Com h = 1 o algoritmo termina e o vetor está ordenado.' },
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
    title: 'Vetor já ordenado',
    explanation: 'Em cada h, todo elemento é comparado uma única vez e nada é deslocado. O tempo de execução é sensível à ordem inicial do arquivo: quanto mais ordenado, menos deslocamentos.',
  },
  worstCase: {
    input: null,
    title: 'Custo ainda sem análise completa',
    explanation: 'Ninguém ainda foi capaz de analisar o custo do Shell Sort, e por isso ninguém sabe exatamente por que ele é eficiente. Para a sequência de Knuth, conjecturas apontam para C(n) = O(n^1,25) ou C(n) = O(n (ln n)²). Com os gaps n/2, n/4, …, 1 do laboratório, há entradas que levam o último passo a um trabalho quadrático.',
  },
  whenToUse: [
    'Ótima opção para arquivos com cerca de 5.000 registros.',
    'Quando se quer uma implementação simples, com pouca quantidade de código.',
    'Quando não se pode usar recursão nem memória extra.',
  ],
  whenToAvoid: [
    'Quando a estabilidade é necessária: o método não é estável.',
    'Quando é preciso um tempo de execução previsível: ele é sensível à ordem inicial do arquivo.',
  ],
  comparisons: [
    { with: 'insertion-sort', text: 'É a base do Shell Sort; os gaps grandes eliminam a maior fraqueza do Insertion Sort.' },
    { with: 'heap-sort', text: 'Também é in-place e sem recursão, mas o Heap Sort garante O(n log n).' },
    { with: 'quick-sort', text: 'O Quick Sort costuma ser mais rápido em arrays grandes, mas depende de recursão.' },
  ],
};
