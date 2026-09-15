package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.INSERTION;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.PARTITION;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.SWAP;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class ShellSortTest {

	private final ShellSort algorithm = new ShellSort();

	@Test
	void usesHalvingGapSequence() {
		SortResult result = algorithm.sort(new int[] {8, 3, 7, 4, 9, 2, 6, 5});

		assertThat(StepAssertions.stepsOf(result, PARTITION))
				.extracting(SortStep::message)
				.satisfiesExactly(
						message -> assertThat(message).startsWith("Gap = 4:"),
						message -> assertThat(message).startsWith("Gap = 2:"),
						message -> assertThat(message).startsWith("Gap = 1:"));
		assertThat(StepAssertions.count(result, SWAP)).isZero();
	}

	@Test
	void comparesElementsGapPositionsApart() {
		SortResult result = algorithm.sort(new int[] {8, 3, 7, 4, 9, 2, 6, 5});

		SortStep firstComparison = result.steps().get(1);
		assertThat(firstComparison.type()).isEqualTo(COMPARISON);
		assertThat(firstComparison.indexes()).containsExactly(0, 4);
		assertThat(firstComparison.involvedValues()).containsExactly(8, 9);
	}

	@Test
	void withGapOneBehavesLikeInsertionSort() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(
				PARTITION, COMPARISON, INSERTION, INSERTION, COMPARISON, INSERTION, COMPARISON, INSERTION, COMPLETE);
	}

	@Test
	void exposesMetadataWithGapSequence() {
		assertThat(algorithm.getId()).isEqualTo("shell-sort");
		assertThat(algorithm.getName()).isEqualTo("Shell Sort");
		Complexity complexity = algorithm.getComplexity();
		assertThat(complexity.bestCase()).contains("n/2, n/4");
		assertThat(complexity.averageCase()).contains("n/2, n/4");
		assertThat(complexity.worstCase()).startsWith("O(n²)").contains("n/2, n/4");
		assertThat(complexity.space()).isEqualTo("O(1)");
		assertThat(algorithm.isStable()).isFalse();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
