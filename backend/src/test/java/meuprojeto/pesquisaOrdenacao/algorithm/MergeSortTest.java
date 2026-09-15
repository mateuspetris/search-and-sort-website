package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.MERGE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.PARTITION;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class MergeSortTest {

	private final MergeSort algorithm = new MergeSort();

	@Test
	void dividesThenMerges() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(
				PARTITION, PARTITION,
				COMPARISON, MERGE, MERGE,
				COMPARISON, MERGE, COMPARISON, MERGE, MERGE,
				COMPLETE);
		assertThat(result.steps().get(0).indexes()).containsExactly(0, 2);
		assertThat(result.steps().get(1).indexes()).containsExactly(0, 1);
		assertThat(result.steps().get(2).involvedValues()).containsExactly(3, 1);
		assertThat(result.steps().get(4).values()).containsExactly(1, 3, 2);
		assertThat(result.comparisons()).isEqualTo(3);
		assertThat(result.swaps()).isZero();
		assertThat(result.moves()).as("5 cópias para o auxiliar + 5 escritas").isEqualTo(10);
	}

	@Test
	void everyElementIsWrittenOncePerMergeLevel() {
		SortResult result = algorithm.sort(new int[] {8, 3, 7, 4, 9, 2, 6, 5});

		// 8 elementos → 3 níveis de mesclagem → 24 escritas; 7 divisões
		assertThat(StepAssertions.count(result, MERGE)).isEqualTo(24);
		assertThat(StepAssertions.count(result, PARTITION)).isEqualTo(7);
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("merge-sort");
		assertThat(algorithm.getName()).isEqualTo("Merge Sort");
		assertThat(algorithm.getComplexity())
				.isEqualTo(new Complexity("O(n log n)", "O(n log n)", "O(n log n)", "O(n)"));
		assertThat(algorithm.isStable()).isTrue();
		assertThat(algorithm.isInPlace()).isFalse();
	}
}
