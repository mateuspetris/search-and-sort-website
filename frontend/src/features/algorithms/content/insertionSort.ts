import type { AlgorithmContent } from './types';

export const insertionSort: AlgorithmContent = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  tagline: 'Pega um elemento de cada vez e o insere na posição correta entre os já ordenados.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'O Insertion Sort (Inserção Direta) é um dos algoritmos de ordenação mais simples e intuitivos.',
    'Ele funciona de maneira semelhante ao modo como organizamos cartas nas mãos: pegamos uma carta por vez e a inserimos na posição correta entre as que já estão ordenadas.',
  ],
  howItWorks: [
    'Selecione o próximo elemento da sequência.',
    'Compare esse elemento com os anteriores, à esquerda.',
    'Desloque os elementos maiores uma posição à frente para abrir espaço.',
    'Insira o elemento na posição correta e repita até o final do vetor. A cada iteração, a parte à esquerda do vetor estará ordenada.',
  ],
  example: [
    { values: [35, 64, 41, 72, 55, 28, 30, 49, 77, 50], highlight: [1], note: 'O 64 é comparado com o 35 e já está no lugar. O próximo elemento é o 41.' },
    { values: [35, 41, 64, 72, 55, 28, 30, 49, 77, 50], highlight: [1], note: 'O 64 foi deslocado uma posição à frente e o 41 foi inserido entre o 35 e o 64.' },
    { values: [35, 41, 55, 64, 72, 28, 30, 49, 77, 50], highlight: [2], note: 'O 72 já estava no lugar; o 55 foi inserido depois de deslocar o 72 e o 64.' },
    { values: [28, 35, 41, 55, 64, 72, 30, 49, 77, 50], highlight: [0], note: 'O 28 é menor que todos os anteriores: todos são deslocados e ele vai para o início.' },
    { values: [28, 30, 35, 41, 49, 50, 55, 64, 72, 77], note: 'Inserindo o 30, o 49, o 77 e o 50 da mesma forma, o vetor fica ordenado.' },
  ],
  code: `
public void insertionSort(){
    int i, j, temp;

    for (i=1; i < this.quant; i++){
        temp = this.lista[i];
        j = i-1;
        while ((j >= 0) && (this.lista[j] > temp)){
            this.lista [j+1] = this.lista[j];
            j--;
        }
        this.lista [j+1] = temp;
    }
}`,
  codeNotes: [
    {
      title: 'A chave fica guardada',
      text: 'temp guarda o valor enquanto os maiores são deslocados. Durante o deslocamento, o array mostra um valor repetido por um instante — é esperado.',
    },
    {
      title: 'Parada natural',
      text: 'O while termina assim que encontra um elemento menor ou igual a temp. Em dados ordenados, isso acontece na primeira comparação: melhor caso O(n).',
    },
    {
      title: 'Deslocar em vez de trocar',
      text: 'Cada deslocamento é uma única escrita, enquanto uma troca exige três. Por isso o laboratório mostra 0 trocas para este algoritmo.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Vetor já ordenado',
    explanation: 'Cada elemento é comparado uma única vez com o vizinho da esquerda e nenhum deslocamento acontece: n − 1 comparações. As únicas movimentações são guardar o elemento em temp e escrevê-lo de volta.',
    cost: { comparisons: 'O(n)', movements: 'O(n)' },
  },
  worstCase: {
    input: 'reversed',
    title: 'Vetor em ordem contrária',
    explanation: 'Cada elemento precisa atravessar toda a parte ordenada até o início: n(n − 1)/2 comparações e deslocamentos.',
    cost: { comparisons: 'O(n²)', movements: 'O(n²)' },
  },
  whenToUse: [
    'Em vetores quase ordenados.',
    'Quando se deseja adicionar poucos itens, de forma ordenada, a um arquivo já ordenado: nesse caso a ordem é linear.',
    'Quando a estabilidade é necessária: é um método estável.',
  ],
  whenToAvoid: ['Em grandes volumes de dados desordenados: no pior caso, comparações e movimentações são quadráticas.'],
  comparisons: [
    { with: 'shell-sort', text: 'O Shell Sort é um Insertion Sort com saltos maiores no início, o que reduz muito os deslocamentos.' },
    { with: 'bubble-sort', text: 'Mesma complexidade, mas o Insertion Sort faz menos escritas e costuma ser mais rápido.' },
    { with: 'merge-sort', text: 'O Merge Sort é O(n log n) em qualquer caso, mas precisa de memória extra e perde em arrays pequenos.' },
  ],
};
