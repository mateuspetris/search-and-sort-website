package meuprojeto.pesquisaOrdenacao.algorithm;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class StepRecorderTest {

	private final StepRecorder recorder = new StepRecorder();

	@Test
	void comparisonRecordsIndexesValuesAndCountsComparison() {
		int[] array = {5, 3};

		recorder.comparison(array, 0, 1, "msg");
		SortResult result = recorder.complete(array);

		SortStep step = result.steps().getFirst();
		assertThat(step.type()).isEqualTo(OperationType.COMPARISON);
		assertThat(step.indexes()).containsExactly(0, 1);
		assertThat(step.involvedValues()).containsExactly(5, 3);
		assertThat(step.pivotIndex()).isNull();
		assertThat(result.comparisons()).isEqualTo(1);
		assertThat(result.swaps()).isZero();
	}

	@Test
	void swapExchangesElementsAndRecordsOriginalValues() {
		int[] array = {5, 3, 1};

		recorder.swap(array, 0, 2, "msg");
		SortResult result = recorder.complete(array);

		assertThat(array).containsExactly(1, 3, 5);
		SortStep step = result.steps().getFirst();
		assertThat(step.values()).containsExactly(1, 3, 5);
		assertThat(step.involvedValues()).containsExactly(5, 1);
		assertThat(result.swaps()).isEqualTo(1);
	}

	@Test
	void writeOperationsChangeArrayWithoutCountingSwaps() {
		int[] array = {0, 0};

		recorder.insertion(array, 0, 7, "msg");
		recorder.merge(array, 1, 9, "msg");
		SortResult result = recorder.complete(array);

		assertThat(array).containsExactly(7, 9);
		assertThat(StepAssertions.types(result))
				.containsExactly(OperationType.INSERTION, OperationType.MERGE, OperationType.COMPLETE);
		assertThat(result.steps().get(1).involvedValues()).containsExactly(9);
		assertThat(result.swaps()).isZero();
	}

	@Test
	void snapshotIsNotAffectedByLaterChanges() {
		int[] array = {1, 2};

		recorder.pivotSelected(array, 1, "msg");
		array[0] = 99;
		SortResult result = recorder.complete(array);

		assertThat(result.steps().getFirst().values()).containsExactly(1, 2);
		assertThat(result.finalArray()).containsExactly(99, 2);
	}

	@Test
	void pivotAndPartitionCarryPivotIndex() {
		int[] array = {4, 1, 3};

		recorder.pivotSelected(array, 2, "msg");
		recorder.partition(array, 0, 2, 1, "msg");
		SortResult result = recorder.complete(array);

		assertThat(result.steps().get(0).pivotIndex()).isEqualTo(2);
		assertThat(result.steps().get(0).involvedValues()).containsExactly(3);
		assertThat(result.steps().get(1).indexes()).containsExactly(0, 2);
		assertThat(result.steps().get(1).pivotIndex()).isEqualTo(1);
		assertThat(result.comparisons()).isZero();
	}

	@Test
	void countsMovesLikeWirth() {
		int[] array = {3, 1, 0};

		recorder.swap(array, 0, 1, "msg");
		recorder.insertion(array, 2, 9, "msg");
		recorder.merge(array, 0, 7, "msg");
		SortResult result = recorder.complete(array);

		assertThat(result.steps()).extracting(SortStep::moves).containsExactly(3, 1, 1, 0);
		assertThat(result.moves()).isEqualTo(5);
	}

	@Test
	void temporaryMovesAreAttachedToNextStep() {
		int[] array = {2, 1};

		recorder.countMoves(1);
		recorder.comparison(array, 0, 1, "msg");
		recorder.comparison(array, 0, 1, "msg");
		recorder.countMoves(2);
		SortResult result = recorder.complete(array);

		assertThat(result.steps()).extracting(SortStep::moves).containsExactly(1, 0, 2);
		assertThat(result.moves()).isEqualTo(3);
	}

	@Test
	void completeProducesSequentialStepNumbersAndTotalCount() {
		int[] array = {2, 1};

		recorder.comparison(array, 0, 1, "msg");
		recorder.swap(array, 0, 1, "msg");
		SortResult result = recorder.complete(array);

		assertThat(result.steps()).extracting(SortStep::step).containsExactly(1, 2, 3);
		assertThat(result.steps().getLast().type()).isEqualTo(OperationType.COMPLETE);
	}
}
