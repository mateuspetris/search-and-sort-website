package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.INSERTION;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class InsertionSortTest {

	private final InsertionSort algorithm = new InsertionSort();

	@Test
	void shiftsAndInsertsInsteadOfSwapping() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result))
				.containsExactly(COMPARISON, INSERTION, INSERTION, COMPARISON, INSERTION, COMPARISON, INSERTION, COMPLETE);
		assertThat(result.steps().get(0).involvedValues()).containsExactly(3, 1);
		assertThat(result.steps().get(1).values()).containsExactly(3, 3, 2);
		assertThat(result.steps().get(2).values()).containsExactly(1, 3, 2);
		assertThat(result.steps().get(2).indexes()).containsExactly(0);
		assertThat(result.comparisons()).isEqualTo(3);
		assertThat(result.swaps()).isZero();
		assertThat(result.moves()).as("2 chaves copiadas + 2 deslocamentos + 2 inserções").isEqualTo(6);
	}

	@Test
	void comparisonReportsKeyEvenAfterShift() {
		SortResult result = algorithm.sort(new int[] {3, 2, 1});

		// inserindo 1: após deslocar 3, a posição 2 contém uma cópia de 3, mas a chave comparada ainda é 1
		assertThat(StepAssertions.stepsOf(result, COMPARISON))
				.extracting(step -> step.involvedValues()[1])
				.containsExactly(2, 1, 1);
	}

	@Test
	void sortedInputNeedsLinearComparisonsAndRewritesEachKeyInPlace() {
		SortResult result = algorithm.sort(new int[] {1, 2, 3, 4, 5});

		assertThat(result.comparisons()).isEqualTo(4);
		assertThat(StepAssertions.stepsOf(result, INSERTION))
				.extracting(step -> step.indexes()[0])
				.containsExactly(1, 2, 3, 4);
		assertThat(result.moves()).as("cada chave é copiada e escrita de volta").isEqualTo(8);
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("insertion-sort");
		assertThat(algorithm.getName()).isEqualTo("Insertion Sort");
		assertThat(algorithm.getComplexity()).isEqualTo(new Complexity("O(n)", "O(n²)", "O(n²)", "O(1)"));
		assertThat(algorithm.isStable()).isTrue();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
