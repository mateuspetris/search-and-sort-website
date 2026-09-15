import type { AlgorithmContent } from './types';

export const cocktailShakerSort: AlgorithmContent = {
  id: 'cocktail-shaker-sort',
  name: 'Cocktail Shaker Sort',
  tagline: 'Um Bubble Sort de ida e volta: leva o maior para o fim e o menor para o início.',
  headlineComplexity: 'O(n²)',
  simplicity: 'Alta',
  intro: [
    'Também chamado de Cocktail Sort, Shaker Sort ou Bubble Sort bidirecional. Ele alterna uma passagem da esquerda para a direita com outra da direita para a esquerda.',
    'Isso corrige uma fraqueza do Bubble Sort: elementos pequenos que estão no fim do array avançam só uma posição por passagem. Aqui, eles voltam de uma vez.',
  ],
  howItWorks: [
    'Passagem →: compare e troque vizinhos fora de ordem; o maior elemento chega ao fim.',
    'Passagem ←: faça o mesmo no sentido contrário; o menor elemento chega ao início.',
    'Estreite os limites nas duas pontas, pois elas já estão ordenadas.',
    'Repita até os limites se encontrarem. Na forma básica não há verificação de array já ordenado: todas as idas e voltas são feitas.',
  ],
  example: [
    { values: [2, 3, 4, 5, 1], highlight: [3, 4], note: 'Passagem →: só na última comparação aparece algo fora de ordem (5 > 1).' },
    { values: [2, 3, 4, 1, 5], highlight: [3], note: 'Aqui o Bubble Sort precisaria de mais três passagens para levar o 1 ao início.' },
    { values: [1, 2, 3, 4, 5], highlight: [0], note: 'Passagem ←: o 1 volta até o início em uma única passagem.' },
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
    title: 'Array já ordenado',
    explanation: 'Na forma básica, usada no laboratório, nenhuma troca acontece, mas todas as idas e voltas são percorridas: n(n − 1)/2 comparações. O melhor caso também é O(n²). Com a parada do código acima, uma ida e volta sem trocas bastaria: O(n).',
  },
  worstCase: {
    input: 'reversed',
    title: 'Array em ordem inversa',
    explanation: 'Todas as comparações geram trocas: n(n − 1)/2 comparações e o mesmo número de trocas, exatamente como o Bubble Sort.',
  },
  whenToUse: [
    'Para mostrar como uma pequena mudança melhora o Bubble Sort em certos casos.',
    'Em arrays pequenos com poucos elementos fora do lugar nas duas pontas.',
  ],
  whenToAvoid: ['Em grandes volumes de dados: a complexidade continua quadrática.'],
  comparisons: [
    { with: 'bubble-sort', text: 'Em entradas como [2, 3, 4, 5, 1], o Bubble Sort precisa de uma passagem por posição para trazer o 1; aqui basta uma volta.' },
    { with: 'insertion-sort', text: 'Em geral o Insertion Sort ainda faz menos operações para o mesmo resultado.' },
  ],
};
