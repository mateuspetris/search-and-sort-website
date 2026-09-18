import type { AlgorithmContent } from './types';

export const mergeSort: AlgorithmContent = {
  id: 'merge-sort',
  name: 'Merge Sort',
  tagline: 'Divide o array ao meio até sobrarem pedaços triviais e depois os mescla em ordem.',
  headlineComplexity: 'O(n log n)',
  simplicity: 'Média',
  intro: [
    'O Merge Sort é um algoritmo de ordenação eficiente que também usa a estratégia de dividir para conquistar.',
    'Ele divide o vetor em partes menores até que cada parte tenha apenas um elemento e, em seguida, faz a intercalação (merge) dessas partes de forma ordenada, reconstruindo o vetor final já ordenado.',
  ],
  howItWorks: [
    'Divida o vetor em duas metades aproximadamente iguais e repita a divisão em cada metade até que cada subvetor tenha apenas um elemento.',
    'Inicie a intercalação (merge), comparando os elementos dos subvetores.',
    'A cada passo, copie o menor elemento para o vetor de destino, usando as cópias das metades como vetores auxiliares.',
    'Continue a intercalação até que todos os elementos das duas partes tenham sido combinados em ordem. Ao final de cada intercalação, os subvetores formam um único vetor ordenado, e a ordenação se mantém em todas as etapas da recursão.',
  ],
  example: [
    { values: [35, 64, 41, 72, 55, 69, 30, 28, 77, 50], splits: [4], note: 'O vetor é dividido em duas metades: a esquerda (VetEsq) e a direita (VetDir).' },
    { values: [35, 64, 41, 72, 55, 69, 30, 28, 77, 50], splits: [0, 1, 2, 3, 4, 5, 6, 7, 8], note: 'A divisão continua até que cada subvetor tenha um único elemento.' },
    { values: [35, 41, 55, 64, 72, 69, 30, 28, 77, 50], splits: [4], highlight: [0, 1, 2, 3, 4], note: 'As intercalações da esquerda terminaram: essa parte está ordenada. Agora o algoritmo ordena a parte direita.' },
    { values: [35, 41, 55, 64, 72, 28, 30, 50, 69, 77], splits: [4], highlight: [5, 6, 7, 8, 9], note: 'A parte direita também está ordenada. Falta a última intercalação.' },
    { values: [28, 30, 35, 41, 50, 55, 64, 69, 72, 77], note: 'A intercalação final compara sempre o primeiro elemento restante de cada metade e termina a ordenação.' },
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
    title: 'Não há melhor caso',
    explanation: 'A divisão ao meio gera cerca de log₂ n níveis de recursão, e em cada nível todos os elementos são percorridos na intercalação, a um custo O(n). São log n níveis × n operações: O(n log n), com o vetor ordenado, invertido ou aleatório.',
    cost: { comparisons: 'O(n log n)', movements: 'O(n log n)' },
  },
  worstCase: {
    input: 'reversed',
    title: 'Nem pior caso',
    explanation: 'Diferente do Quick Sort, o Merge Sort não depende da ordem dos dados: ele sempre divide o vetor por completo e faz todas as intercalações. Qualquer entrada tem o mesmo custo. No laboratório, a diferença entre os tipos de entrada é pequena.',
    cost: { comparisons: 'O(n log n)', movements: 'O(n log n)' },
  },
  whenToUse: [
    'Quando é preciso garantir O(n log n), qualquer que seja a ordem inicial dos dados.',
    'Quando a ordenação precisa ser estável: é um algoritmo eficiente e estável.',
  ],
  whenToAvoid: ['Quando a memória é escassa: usa memória extra O(n) para os vetores auxiliares durante o merge.'],
  comparisons: [
    { with: 'quick-sort', text: 'O Quick Sort costuma ser mais rápido e é in-place, mas tem pior caso O(n²) e não é estável.' },
    { with: 'heap-sort', text: 'O Heap Sort também garante O(n log n) e usa O(1) de memória, mas não é estável.' },
    { with: 'insertion-sort', text: 'Implementações reais combinam os dois: Insertion Sort para os pedaços pequenos da recursão.' },
  ],
};
