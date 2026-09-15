package meuprojeto.pesquisaOrdenacao.algorithm;

import java.util.List;

public record SortResult(int[] finalArray, List<SortStep> steps, int comparisons, int swaps, int moves) {
}
