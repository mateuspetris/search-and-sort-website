import type { AlgorithmContent } from './types';

export const bubbleSort: AlgorithmContent = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  tagline: 'Compara vizinhos e troca quando estão fora de ordem, até que os maiores “borbulhem” para o fim.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'O Bubble Sort (Bolha) é um método simples e de fácil entendimento e implementação, um dos mais conhecidos e difundidos métodos de ordenação de arranjos. Mas não é um algoritmo eficiente: é estudado visando o desenvolvimento de raciocínio.',
    'Seu princípio é a troca de valores entre posições consecutivas, fazendo com que os valores mais altos (ou mais baixos) “borbulhem” para o final do arranjo. Daí o nome Bubble Sort.',
  ],
  howItWorks: [
    'As chaves nas posições 1 e 2 são comparadas; se estiverem fora de ordem, são trocadas.',
    'O processo se repete com as chaves 2 e 3, 3 e 4, …, n − 1 e n. Ao fim da passagem, a maior chave está na última posição.',
    'O processo recomeça da posição 1, agora só até a comparação entre n − 2 e n − 1, pois a última posição já está definida.',
    'As passagens se repetem até que sobrem apenas as 2 primeiras chaves. A posição da última troca (LSup) marca onde a próxima passagem termina: tudo depois dela já está ordenado.',
  ],
  example: [
    { values: [35, 64, 41, 72, 55, 28, 30, 49, 77, 50], highlight: [0, 1], note: 'A 1ª passagem compara as posições 1 e 2, depois 2 e 3, e assim por diante, trocando os vizinhos fora de ordem.' },
    { values: [35, 41, 64, 55, 28, 30, 49, 72, 50, 77], highlight: [9], note: 'Fim da 1ª passagem: o 77, a maior chave, “borbulhou” até o fim do vetor.' },
    { values: [35, 41, 55, 28, 30, 49, 64, 50, 72, 77], highlight: [8, 9], note: 'Fim da 2ª passagem: o 72 chegou à sua posição. Cada passagem fixa mais uma chave no final.' },
    { values: [35, 28, 30, 41, 49, 50, 55, 64, 72, 77], highlight: [0], note: 'Fim da 4ª passagem: as chaves pequenas andam só uma posição por passagem para a esquerda, e o 28 e o 30 ainda estão fora do lugar.' },
    { values: [28, 30, 35, 41, 49, 50, 55, 64, 72, 77], note: 'Na 5ª passagem o 35 troca com o 28 e com o 30, e a última troca acontece na posição 1: LSup vira 1. Uma passagem final, só entre as 2 primeiras chaves, não troca nada e o algoritmo termina.' },
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
    title: 'Vetor já ordenado',
    explanation: 'Com a parada do código acima, uma única passagem sem trocas basta: n − 1 comparações e nenhuma movimentação. O laboratório usa a forma básica, sem a parada, e por isso ainda conta n(n − 1)/2 comparações nessa entrada.',
    cost: { comparisons: 'O(n)', movements: '0' },
  },
  worstCase: {
    input: 'reversed',
    title: 'Vetor em ordem contrária',
    explanation: 'Cada comparação resulta em troca: n(n − 1)/2 comparações e o mesmo número de trocas. Como melhor e pior caso têm ordens diferentes, a organização inicial dos dados pesa muito no custo.',
    cost: { comparisons: 'O(n²)', movements: 'O(n²)' },
  },
  whenToUse: [
    'Para desenvolver o raciocínio: é simples, de fácil entendimento e implementação, e não gasta memória extra.',
    'Quando a estabilidade importa em um conjunto pequeno: é um método estável.',
    'Em arquivos quase ordenados, onde costuma ser eficiente.',
  ],
  whenToAvoid: [
    'Quando o desempenho importa: faz muitas trocas, o que o torna o menos eficiente dos métodos simples ou diretos.',
    'Em arquivos ordenados com exceção do menor elemento, que está na última posição: nesse caso ele faz o mesmo número de comparações do pior caso.',
    'Por ser lento: só compara posições adjacentes, cada passo aproveita muito pouco do anterior e há comparações redundantes, pois segue uma sequência fixa de comparações.',
  ],
  comparisons: [
    { with: 'insertion-sort', text: 'Mesma complexidade, mas o Insertion Sort costuma fazer bem menos escritas e é mais rápido na prática.' },
    { with: 'cocktail-shaker-sort', text: 'Variação bidirecional que resolve a lentidão do Bubble Sort para mover elementos pequenos que estão no fim.' },
    { with: 'selection-sort', text: 'Os dois fazem sempre n(n − 1)/2 comparações, mas o Selection Sort faz só n − 1 trocas; em compensação, não é estável.' },
  ],
};
