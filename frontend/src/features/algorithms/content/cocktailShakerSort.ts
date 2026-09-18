import type { AlgorithmContent } from './types';

export const cocktailShakerSort: AlgorithmContent = {
  id: 'cocktail-shaker-sort',
  name: 'Cocktail Shaker Sort',
  tagline: 'Um Bubble Sort de ida e volta: leva o maior para o fim e o menor para o início.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'O Shaker Sort (também chamado de Cocktail Shaker Sort) é uma variação do Bubble Sort que busca melhorar seu desempenho.',
    'A principal diferença está no sentido do percurso, que alterna a cada passada. Isso permite que os elementos sejam movidos tanto da esquerda para a direita quanto da direita para a esquerda, acelerando o processo de ordenação.',
  ],
  howItWorks: [
    'Sejam esq o indicador da esquerda, dir o indicador da direita e j o indicador da última troca. No início, esq = 1 e dir = n − 1.',
    'Percorra da direita para a esquerda, levando os menores elementos para o início. Ao final dessa passada, os elementos a₁, …, aⱼ₋₁ estão ordenados: atualize esq = j + 1.',
    'Percorra da esquerda para a direita, levando os maiores elementos para o fim. Agora os elementos aⱼ, …, aₙ estão ordenados: atualize dir = j − 1.',
    'Repita as passadas até que os indicadores se cruzem ou não haja mais trocas.',
  ],
  example: [
    { values: [35, 64, 41, 72, 55, 28, 30, 49, 77, 50], highlight: [5], note: 'Primeira passada, da direita para a esquerda: o 28, a menor chave, será levado até o início.' },
    { values: [28, 35, 64, 41, 72, 55, 30, 49, 50, 77], highlight: [0], note: 'O 28 chegou ao início em uma única passada. A última troca foi na posição 1, então esq = 2.' },
    { values: [28, 35, 41, 64, 55, 30, 49, 50, 72, 77], highlight: [8, 9], note: 'Passada da esquerda para a direita: o 72 foi para o fim. A última troca foi na posição 8, então dir = 7.' },
    { values: [28, 30, 35, 41, 64, 55, 49, 50, 72, 77], highlight: [1], note: 'Nova passada para a esquerda traz o 30. Os indicadores vão se aproximando pelas duas pontas.' },
    { values: [28, 30, 35, 41, 49, 50, 55, 64, 72, 77], note: 'Depois de mais três passadas os indicadores se cruzam (esq > dir) e o vetor está ordenado.' },
  ],
  code: `
public void shakersort (){
    int esq, dir, i, j, temp;
    esq = 1;
    dir = this.quant-1;
    j = dir;
    do{ //leva as menores chaves para o início
        for (i = dir ; i >= esq; i-- ) {
            if (this.lista[i-1] > this.lista[i]){
                temp = this.lista[i];
                this.lista[i] = this.lista[i-1];
                this.lista[i-1] = temp;
                j = i;
            }
        }
        esq = j+1;
        //leva as maiores chaves para o final
        for (i = esq ; i <= dir; i++){
            if (this.lista[i-1] > this.lista[i]){
                temp = this.lista[i];
                this.lista[i] = this.lista[i-1];
                this.lista[i-1] = temp;
                j = i;
            }
        }
        dir = j-1;
    }while (esq <= dir);
}`,
  codeNotes: [
    {
      title: 'Limites pela última troca',
      text: 'j guarda a posição da última troca. Depois da passagem ← o início avança para j + 1; depois da passagem → o final recua para j − 1. Se uma passagem não troca nada, esq passa de dir e o algoritmo para.',
    },
    {
      title: 'No laboratório: forma básica',
      text: 'O laboratório executa o Cocktail Shaker Sort sem essa parada e começando pela passagem →: as pontas recuam uma posição por vez e são sempre n(n − 1)/2 comparações, mesmo com o array ordenado. A ideia é a mesma; muda só a otimização e o sentido da primeira passagem.',
    },
    {
      title: 'Mesma comparação nos dois sentidos',
      text: 'Nas duas direções compara-se lista[i − 1] > lista[i] e troca-se só quando é estritamente maior. Isso mantém o algoritmo estável.',
    },
    {
      title: 'Contexto',
      text: 'O método pertence à classe LCInteiro: this.lista é o vetor de inteiros e this.quant é a quantidade de elementos guardados nele.',
    },
  ],
  bestCase: {
    input: 'sorted',
    title: 'Vetor já ordenado',
    explanation: 'Com a parada do código acima, a primeira passada não troca nada, esq passa de dir e o algoritmo termina: n − 1 comparações e nenhuma movimentação. O laboratório usa a forma básica, sem a parada, e por isso ainda conta n(n − 1)/2 comparações nessa entrada.',
    cost: { comparisons: 'O(n)', movements: '0' },
  },
  worstCase: {
    input: 'reversed',
    title: 'Vetor em ordem contrária',
    explanation: 'Todas as comparações geram trocas: n(n − 1)/2 comparações e o mesmo número de trocas, exatamente como no Bubble Sort.',
    cost: { comparisons: 'O(n²)', movements: 'O(n²)' },
  },
  whenToUse: [
    'Para mostrar como alternar o sentido do percurso melhora o Bubble Sort, com o qual se parece.',
    'Quando a estabilidade importa em um conjunto pequeno: é um método estável.',
    'Em vetores pequenos com poucos elementos fora do lugar nas duas pontas.',
  ],
  whenToAvoid: [
    'Quando o desempenho importa: faz muitas trocas, o que o torna um dos menos eficientes dentre os métodos simples ou diretos.',
  ],
  comparisons: [
    { with: 'bubble-sort', text: 'Em entradas como [2, 3, 4, 5, 1], o Bubble Sort precisa de uma passagem por posição para trazer o 1; aqui basta uma volta.' },
    { with: 'insertion-sort', text: 'Em geral o Insertion Sort ainda faz menos operações para o mesmo resultado.' },
  ],
};
