import type { AlgorithmContent } from './types';

export const quickSort: AlgorithmContent = {
  id: 'quick-sort',
  name: 'Quick Sort',
  tagline: 'Escolhe o elemento do meio como pivô, joga os menores para a esquerda e os maiores para a direita, e repete em cada lado.',
  headlineComplexity: 'O(n log n)',
  simplicity: 'Média',
  intro: [
    'O Quick Sort é um dos algoritmos de ordenação mais eficientes na prática. Ele usa a estratégia de dividir para conquistar, separando os elementos em partes menores e ordenando essas partes de forma recursiva.',
    'A partição usa um pivô, geralmente o primeiro, o último ou o do meio. No código abaixo o pivô é o elemento do meio, e dois índices, i e j, caminham um em direção ao outro trocando os elementos que estão do lado errado.',
  ],
  howItWorks: [
    'Escolha um elemento como pivô.',
    'Percorra o vetor a partir do início, com o índice i, até encontrar um item com chave maior ou igual à do pivô.',
    'Percorra o vetor a partir do final, com o índice j, até encontrar um item com chave menor ou igual à do pivô, e troque os itens v[i] e v[j].',
    'Continue o percurso-e-troca até i e j se cruzarem. Então v[1], …, v[j] são todos menores ou iguais ao pivô e v[j + 1], …, v[n] são todos maiores ou iguais: cada grupo é ordenado recursivamente da mesma forma.',
  ],
  example: [
    { values: [520, 450, 254, 310, 285, 179, 652, 351, 423, 861], pivot: 4, highlight: [0, 5], note: 'Pivô = 285, o elemento do meio. i para no 520 (≥ 285) e j para no 179 (≤ 285): os dois são trocados.' },
    { values: [179, 450, 254, 310, 285, 520, 652, 351, 423, 861], pivot: 4, highlight: [1, 4], note: 'i para no 450 e j para no próprio 285: nova troca.' },
    { values: [179, 285, 254, 310, 450, 520, 652, 351, 423, 861], pivot: 1, splits: [2], note: 'i e j se cruzaram: [179, 285, 254] ≤ 285 ≤ [310, …, 861]. Cada grupo é ordenado recursivamente.' },
    { values: [179, 254, 285, 310, 351, 423, 450, 520, 652, 861], note: 'Repetindo a partição em cada grupo até que cada um tenha um único elemento, o vetor fica ordenado.' },
  ],
  code: `
public void quicksort (){
    ordena (0, this.quant-1);
}

private void ordena (int esq, int dir){
    int pivo, i = esq, j = dir, temp;

    pivo = this.lista[(i+j)/2];
    do {
        while (this.lista[i] < pivo)
            i++;
        while (this.lista[j] > pivo)
            j--;
        if (i <= j) {
            temp = this.lista[i];
            this.lista[i] = this.lista[j];
            this.lista[j] = temp;
            i++;
            j--;
        }
    } while (i <= j);
    if (esq < j)
        ordena (esq, j);
    if (dir > i)
        ordena (i, dir);
}`,
  codeNotes: [
    {
      title: 'Pivô do meio',
      text: 'pivo = lista[(i + j)/2]. Escolher o meio evita o pior caso em entradas ordenadas ou invertidas: nelas, o elemento do meio é justamente a mediana e a divisão sai perfeita.',
    },
    {
      title: 'Dois índices',
      text: 'i procura um elemento que não é menor que o pivô; j procura um que não é maior. Quando os dois param, esses elementos estão do lado errado e trocam de lugar.',
    },
    {
      title: 'Quando parar',
      text: 'O do-while termina quando i passa de j. Tudo em [esq..j] é ≤ pivô e tudo em [i..dir] é ≥ pivô; os elementos entre eles (se houver) já estão no lugar.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Partição que divide o arquivo ao meio',
    explanation: 'C(n) = 2C(n/2) + n, em que C(n/2) é o custo de ordenar cada metade e n é o custo de examinar cada item. Isso dá cerca de 1,4 n log n comparações; em média, o tempo de execução é O(n log n). Com o pivô do meio, um vetor já ordenado ou invertido cai exatamente nesse caso.',
    cost: { comparisons: '≈ 1,4 n log n' },
  },
  worstCase: {
    input: null,
    title: 'Pivô em um dos extremos',
    explanation: 'Escolher como pivô um dos extremos de um arquivo já ordenado faz cada partição eliminar um único elemento: são n chamadas recursivas, uma pilha auxiliar de tamanho n e C(n) = n²/2 comparações. Para evitar o pior caso, escolha 3 itens quaisquer e use a mediana dos 3 como pivô. O pivô do meio, usado aqui, também evita o problema nas entradas ordenadas.',
    cost: { comparisons: 'n²/2' },
  },
  whenToUse: [
    'Como ordenação de uso geral: é muito eficiente, precisa em média de n log n operações e é usado em diversas bibliotecas padrão de linguagens de programação.',
    'Quando só se pode gastar pouca memória: necessita apenas de uma pequena pilha auxiliar.',
  ],
  whenToAvoid: [
    'Em arquivos já ordenados quando a escolha do pivô não é boa: a versão recursiva tem pior caso O(n²).',
    'Quando a estabilidade importa: o método não é estável.',
    'Quando não há cuidado na implementação: ela é delicada e difícil, e um pequeno engano pode levar a efeitos inesperados.',
  ],
  comparisons: [
    { with: 'merge-sort', text: 'O Merge Sort garante O(n log n) e é estável, ao custo de O(n) de memória extra.' },
    { with: 'heap-sort', text: 'O Heap Sort garante O(n log n) in-place, mas faz mais comparações e movimentações: no quadro de Wirth ele fica atrás do Quick Sort.' },
    { with: 'insertion-sort', text: 'Em arrays pequenos ou já ordenados o Insertion Sort pode vencer; por isso implementações reais trocam para ele nos intervalos pequenos.' },
  ],
};
