package meuprojeto.pesquisaOrdenacao.dto;

import java.util.List;

public record SortResponse(
		String algorithm,
		int[] initialArray,
		int[] finalArray,
		ExecutionMetrics metrics,
		List<ExecutionStep> steps) {
}
