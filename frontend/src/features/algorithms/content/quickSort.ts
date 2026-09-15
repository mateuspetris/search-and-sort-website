import type { AlgorithmContent } from './types';

export const quickSort: AlgorithmContent = {
  id: 'quick-sort',
  name: 'Quick Sort',
  tagline: 'Escolhe o elemento do meio como pivô, joga os menores para a esquerda e os maiores para a direita, e repete em cada lado.',
  headlineComplexity: 'O(n log n)',
  simplicity: 'Média',
  intro: [
    'O Quick Sort divide para conquistar, mas faz o trabalho antes da recursão: a partição separa o intervalo em uma parte com valores menores ou iguais ao pivô e outra com valores maiores ou iguais.',
    'Esta é a versão apresentada por Wirth: o pivô é o elemento do meio e dois índices, i e j, caminham um em direção ao outro trocando os elementos que estão do lado errado.',
  ],
  howItWorks: [
    'Guarde como pivô o valor do elemento do meio do intervalo.',
    'Avance i enquanto a[i] for menor que o pivô; recue j enquanto a[j] for maior que o pivô.',
    'Se i ≤ j, troque a[i] com a[j] e mova os dois índices.',
    'Repita até i e j se cruzarem; depois ordene recursivamente [início..j] e [i..fim].',
  ],
  example: [
    { values: [6, 2, 8, 5, 1, 9, 3], pivot: 3, note: 'Pivô = 5, o elemento do meio. i começa na esquerda e j na direita.' },
    { values: [3, 2, 8, 5, 1, 9, 6], pivot: 3, highlight: [0, 6], note: 'i para no 6 (≥ 5) e j no 3 (≤ 5): estão do lado errado e são trocados.' },
    { values: [3, 2, 1, 5, 8, 9, 6], pivot: 3, highlight: [2, 4], note: 'i avança até o 8 e j recua até o 1: nova troca.' },
    { values: [3, 2, 1, 5, 8, 9, 6], pivot: 3, splits: [2, 3], note: 'Os índices se cruzaram: [3, 2, 1] ≤ 5 ≤ [8, 9, 6]. O processo se repete em cada lado.' },
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
    title: 'Array já ordenado ou invertido',
    explanation: 'Com o pivô no meio, cada partição divide o intervalo em duas metades iguais: log n níveis de recursão com trabalho O(n) em cada um. É por isso que, no quadro de Wirth, o Quick Sort é o mais rápido também nessas entradas.',
  },
  worstCase: {
    input: null,
    title: 'Entradas construídas contra o pivô do meio',
    explanation: 'Se o elemento do meio for sempre o menor ou o maior do intervalo, cada partição remove só um elemento e o custo vira O(n²). Essas entradas precisam ser montadas de propósito e quase não aparecem na prática.',
  },
  whenToUse: [
    'Como ordenação de uso geral em memória: é o mais rápido na média e é in-place.',
    'Quando estabilidade não é necessária.',
  ],
  whenToAvoid: [
    'Quando é preciso garantir o tempo no pior caso.',
    'Quando a ordem de elementos iguais precisa ser preservada.',
  ],
  comparisons: [
    { with: 'merge-sort', text: 'O Merge Sort garante O(n log n) e é estável, ao custo de O(n) de memória extra.' },
    { with: 'heap-sort', text: 'O Heap Sort garante O(n log n) in-place, mas faz mais comparações e movimentações: no quadro de Wirth ele fica atrás do Quick Sort.' },
    { with: 'insertion-sort', text: 'Em arrays pequenos ou já ordenados o Insertion Sort pode vencer; por isso implementações reais trocam para ele nos intervalos pequenos.' },
  ],
};
