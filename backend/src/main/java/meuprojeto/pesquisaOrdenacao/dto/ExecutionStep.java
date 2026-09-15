package meuprojeto.pesquisaOrdenacao.dto;

import meuprojeto.pesquisaOrdenacao.algorithm.OperationType;
import meuprojeto.pesquisaOrdenacao.algorithm.SortStep;

public record ExecutionStep(
		int step,
		OperationType type,
		int[] values,
		int[] indexes,
		int[] involvedValues,
		Integer pivotIndex,
		int moves,
		String message) {

	public static ExecutionStep from(SortStep step) {
		return new ExecutionStep(step.step(), step.type(), step.values(), step.indexes(), step.involvedValues(),
				step.pivotIndex(), step.moves(), step.message());
	}
}
