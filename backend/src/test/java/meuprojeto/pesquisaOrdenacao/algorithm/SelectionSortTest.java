package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.SWAP;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class SelectionSortTest {

	private final SelectionSort algorithm = new SelectionSort();

	@Test
	void searchesMinimumThenSwaps() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(COMPARISON, COMPARISON, SWAP, COMPARISON, SWAP, COMPLETE);
		assertThat(result.steps().get(0).message()).contains("Novo menor elemento");
		assertThat(result.steps().get(2).indexes()).containsExactly(0, 1);
		assertThat(result.steps().get(2).values()).containsExactly(1, 3, 2);
		assertThat(result.comparisons()).isEqualTo(3);
		assertThat(result.swaps()).isEqualTo(2);
		assertThat(result.moves()).isEqualTo(6);
	}

	@Test
	void alwaysComparesQuadraticallyAndSwapsOncePerRound() {
		SortResult sorted = algorithm.sort(new int[] {1, 2, 3, 4, 5});
		SortResult reversed = algorithm.sort(new int[] {5, 4, 3, 2, 1});

		assertThat(sorted.comparisons()).isEqualTo(10);
		assertThat(sorted.swaps()).as("troca consigo mesmo quando o menor já está no lugar").isEqualTo(4);
		assertThat(sorted.steps().get(4).message()).contains("troca consigo mesmo");
		assertThat(reversed.comparisons()).isEqualTo(10);
		assertThat(reversed.swaps()).isEqualTo(4);
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("selection-sort");
		assertThat(algorithm.getName()).isEqualTo("Selection Sort");
		assertThat(algorithm.getComplexity()).isEqualTo(new Complexity("O(n²)", "O(n²)", "O(n²)", "O(1)"));
		assertThat(algorithm.isStable()).isFalse();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
