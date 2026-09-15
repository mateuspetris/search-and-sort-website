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
private void dividir (int inicio, int fim) {
    int meio;

    if (inicio<fim) {
        meio = (inicio+fim)/2;
        dividir(inicio, meio);
        dividir(meio+1, fim);
        merge (inicio, meio, fim);
    }
}

private void merge (int inicio, int meio, int fim) {
    int esq, dir, auxEsq, auxDir;
    esq = meio - inicio + 1;
    dir = fim - meio;
    LCInteiro2 vetEsq = new LCInteiro2(esq);
    LCInteiro2 vetDir = new LCInteiro2(dir);

    // Copia esquerda
    for (int i=0; i<esq; i++) {
        vetEsq.add(this.lista[inicio+i]);
    }

    // Copia direita
    for (int i=0; i<dir; i++) {
        vetDir.add(this.lista[meio+i+1]);
    }
    auxEsq = 0;
    auxDir = 0;
    for (int i=inicio; i<=fim; i++) {
        if (auxEsq < esq) {
            if (auxDir < dir){
                if (vetEsq.get(auxEsq) < vetDir.get(auxDir)) {
                    this.lista[i] = vetEsq.get(auxEsq);
                    auxEsq++;
                } else {
                    this.lista[i] = vetDir.get(auxDir);
                    auxDir++;
                }
            } else {
                this.lista[i] = vetEsq.get(auxEsq);
                auxEsq++;
            }
        } else {
            this.lista[i] = vetDir.get(auxDir);
            auxDir++;
        }
    }
}`,
  codeNotes: [
    {
      title: 'Dividir e intercalar',
      text: 'dividir parte o intervalo ao meio até sobrar um elemento e chama merge na volta da recursão. A ordenação completa começa com dividir(0, this.quant − 1).',
    },
    {
      title: 'Cópias das metades',
      text: 'merge copia a metade esquerda para vetEsq e a direita para vetDir (listas LCInteiro2) e depois intercala as duas de volta em this.lista. Essas cópias são a memória extra O(n) que torna o algoritmo não in-place. O laboratório usa um único array auxiliar, criado uma vez.',
    },
    {
      title: 'Estabilidade depende do <',
      text: 'Com vetEsq.get(auxEsq) < vetDir.get(auxDir), um empate pega o elemento da direita primeiro, e iguais podem trocar de ordem. Com <= o Merge Sort é estável, como no laboratório e na tabela de características desta página.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
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
