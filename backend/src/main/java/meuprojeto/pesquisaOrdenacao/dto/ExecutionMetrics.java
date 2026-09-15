package meuprojeto.pesquisaOrdenacao.dto;

public record ExecutionMetrics(int comparisons, int swaps, int moves, int totalSteps, double executionTimeMs,
		int inputSize) {
}
