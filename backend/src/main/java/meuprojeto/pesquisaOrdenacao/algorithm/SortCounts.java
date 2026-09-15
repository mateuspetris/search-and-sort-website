package meuprojeto.pesquisaOrdenacao.algorithm;

/**
 * Contagem de operações de uma execução sem registro de passos.
 *
 * @param comparisons C — comparações entre elementos
 * @param swaps       trocas entre duas posições
 * @param moves       M — atribuições de elementos (troca = 3; deslocamento, escrita ou cópia temporária = 1)
 */
public record SortCounts(long comparisons, long swaps, long moves) {
}
