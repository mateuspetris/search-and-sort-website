package meuprojeto.pesquisaOrdenacao.algorithm;

import java.util.List;

final class StepAssertions {

	private StepAssertions() {
	}

	static List<OperationType> types(SortResult result) {
		return result.steps().stream().map(SortStep::type).toList();
	}

	static long count(SortResult result, OperationType type) {
		return result.steps().stream().filter(step -> step.type() == type).count();
	}

	static List<SortStep> stepsOf(SortResult result, OperationType type) {
		return result.steps().stream().filter(step -> step.type() == type).toList();
	}
}
