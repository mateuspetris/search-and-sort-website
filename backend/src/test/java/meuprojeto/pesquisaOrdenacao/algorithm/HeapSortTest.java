package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.SWAP;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;

class HeapSortTest {

	private final HeapSort algorithm = new HeapSort();

	@Test
	void buildsHeapThenMovesRootToEnd() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(COMPARISON, COMPARISON, SWAP, COMPARISON, SWAP, COMPLETE);
		assertThat(result.steps().get(0).message()).startsWith("Heapify");

		SortStep rootToEnd = result.steps().get(2);
		assertThat(rootToEnd.indexes()).containsExactly(0, 2);
		assertThat(rootToEnd.values()).containsExactly(2, 1, 3);
		assertThat(rootToEnd.message()).contains("Raiz do heap");

		assertThat(result.comparisons()).isEqualTo(3);
		assertThat(result.swaps()).isEqualTo(2);
		assertThat(result.moves()).isEqualTo(6);
	}

	@Test
	void heapifyMovesLargerChildUp() {
		SortResult result = algorithm.sort(new int[] {1, 5, 3});

		SortStep heapifySwap = result.steps().get(2);
		assertThat(heapifySwap.type()).isEqualTo(SWAP);
		assertThat(heapifySwap.values()).containsExactly(5, 1, 3);
		assertThat(heapifySwap.message()).isEqualTo("Heapify: 5 sobe para a posição 0 e 1 desce para a posição 1.");
	}

	@Test
	void rootIsMovedToEachFinalPositionFromTheEnd() {
		SortResult result = algorithm.sort(new int[] {8, 3, 7, 4, 9, 2, 6, 5});

		List<SortStep> rootMoves = StepAssertions.stepsOf(result, SWAP).stream()
				.filter(step -> step.message().startsWith("Raiz do heap"))
				.toList();
		assertThat(rootMoves).extracting(step -> step.indexes()[1]).containsExactly(7, 6, 5, 4, 3, 2, 1);
		assertThat(rootMoves).extracting(step -> step.involvedValues()[0]).containsExactly(9, 8, 7, 6, 5, 4, 3);
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("heap-sort");
		assertThat(algorithm.getName()).isEqualTo("Heap Sort");
		assertThat(algorithm.getComplexity())
				.isEqualTo(new Complexity("O(n log n)", "O(n log n)", "O(n log n)", "O(1)"));
		assertThat(algorithm.isStable()).isFalse();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
