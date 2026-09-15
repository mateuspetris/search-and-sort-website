package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.SWAP;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class BubbleSortTest {

	private final BubbleSort algorithm = new BubbleSort();

	@Test
	void recordsComparisonsAndSwapsInOrder() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(COMPARISON, SWAP, COMPARISON, SWAP, COMPARISON, COMPLETE);
		assertThat(result.steps().get(1).values()).containsExactly(1, 3, 2);
		assertThat(result.steps().get(1).indexes()).containsExactly(0, 1);
		assertThat(result.comparisons()).isEqualTo(3);
		assertThat(result.swaps()).isEqualTo(2);
		assertThat(result.moves()).as("2 trocas × 3 atribuições").isEqualTo(6);
	}

	@Test
	void runsEveryPassEvenWhenAlreadySorted() {
		SortResult result = algorithm.sort(new int[] {1, 2, 3, 4, 5});

		assertThat(result.comparisons()).as("sem parada antecipada: n(n − 1)/2").isEqualTo(10);
		assertThat(result.swaps()).isZero();
	}

	@Test
	void reversedInputIsWorstCase() {
		SortResult result = algorithm.sort(new int[] {5, 4, 3, 2, 1});

		assertThat(result.comparisons()).isEqualTo(10);
		assertThat(result.swaps()).isEqualTo(10);
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("bubble-sort");
		assertThat(algorithm.getName()).isEqualTo("Bubble Sort");
		assertThat(algorithm.getComplexity()).isEqualTo(new Complexity("O(n²)", "O(n²)", "O(n²)", "O(1)"));
		assertThat(algorithm.isStable()).isTrue();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
