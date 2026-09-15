package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.PARTITION;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.PIVOT_SELECTED;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.SWAP;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;

class QuickSortTest {

	private final QuickSort algorithm = new QuickSort();

	@Test
	void usesMiddleElementAsPivotAndPointersMovingInward() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(
				PIVOT_SELECTED, COMPARISON, COMPARISON, COMPARISON, SWAP, PARTITION,
				PIVOT_SELECTED, COMPARISON, COMPARISON, SWAP, PARTITION,
				COMPLETE);

		SortStep pivot = result.steps().get(0);
		assertThat(pivot.indexes()).containsExactly(1);
		assertThat(pivot.involvedValues()).containsExactly(1);
		assertThat(pivot.moves()).isEqualTo(1);

		SortStep firstComparison = result.steps().get(1);
		assertThat(firstComparison.indexes()).containsExactly(0);
		assertThat(firstComparison.involvedValues()).containsExactly(3, 1);
		assertThat(firstComparison.pivotIndex()).isEqualTo(1);

		SortStep swap = result.steps().get(4);
		assertThat(swap.indexes()).containsExactly(0, 1);
		assertThat(swap.values()).containsExactly(1, 3, 2);
		assertThat(swap.pivotIndex()).as("o pivô 1 foi levado para a posição 0").isEqualTo(0);

		assertThat(result.steps().get(5).indexes()).containsExactly(0, 2);
		assertThat(result.comparisons()).isEqualTo(5);
		assertThat(result.swaps()).isEqualTo(2);
		assertThat(result.moves()).isEqualTo(8);
	}

	@Test
	void pivotIsTheMiddleOfEachInterval() {
		SortResult result = algorithm.sort(new int[] {8, 3, 7, 4, 9, 2, 6, 5});

		SortStep firstPivot = StepAssertions.stepsOf(result, PIVOT_SELECTED).getFirst();
		assertThat(firstPivot.indexes()).containsExactly(3);
		assertThat(firstPivot.involvedValues()).containsExactly(4);
	}

	@Test
	void sortedAndReversedInputsAreNotQuadratic() {
		int n = 256;
		int quadratic = n * (n - 1) / 2;

		SortResult sorted = algorithm.sort(IntStream.rangeClosed(1, n).toArray());
		SortResult reversed = algorithm.sort(IntStream.rangeClosed(1, n).map(i -> n + 1 - i).toArray());

		assertThat(sorted.comparisons()).isLessThan(quadratic / 5);
		assertThat(reversed.comparisons()).isLessThan(quadratic / 5);
	}

	@Test
	void swapsElementWithItselfWhenPointersMeet() {
		SortResult result = algorithm.sort(new int[] {1, 2, 3});

		SortStep swap = StepAssertions.stepsOf(result, SWAP).getFirst();
		assertThat(swap.indexes()).containsExactly(1, 1);
		assertThat(swap.moves()).isEqualTo(3);
		assertThat(swap.message()).contains("troca consigo mesmo");
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("quick-sort");
		assertThat(algorithm.getName()).isEqualTo("Quick Sort");
		assertThat(algorithm.getComplexity())
				.isEqualTo(new Complexity("O(n log n)", "O(n log n)", "O(n²)", "O(log n)"));
		assertThat(algorithm.isStable()).isFalse();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
