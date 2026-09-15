package meuprojeto.pesquisaOrdenacao.algorithm;

import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPARISON;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.COMPLETE;
import static meuprojeto.pesquisaOrdenacao.algorithm.OperationType.SWAP;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class CocktailShakerSortTest {

	private final CocktailShakerSort algorithm = new CocktailShakerSort();

	@Test
	void passesForwardThenBackward() {
		SortResult result = algorithm.sort(new int[] {3, 1, 2});

		assertThat(StepAssertions.types(result)).containsExactly(COMPARISON, SWAP, COMPARISON, SWAP, COMPARISON, COMPLETE);
		assertThat(result.steps().get(0).message()).startsWith("Passagem →");
		assertThat(result.steps().get(4).message()).startsWith("Passagem ←");
		assertThat(result.comparisons()).isEqualTo(3);
		assertThat(result.swaps()).isEqualTo(2);
		assertThat(result.moves()).isEqualTo(6);
	}

	@Test
	void backwardPassMovesSmallElementToTheStart() {
		SortResult result = algorithm.sort(new int[] {2, 3, 4, 5, 1});

		// a passagem → só troca 5 e 1; a passagem ← leva o 1 da posição 3 até a posição 0
		assertThat(StepAssertions.stepsOf(result, SWAP))
				.filteredOn(step -> step.message().startsWith("Passagem ←"))
				.extracting(step -> step.indexes()[0])
				.containsExactly(2, 1, 0);
		assertThat(result.swaps()).isEqualTo(4);
	}

	@Test
	void runsEveryPassEvenWhenAlreadySorted() {
		SortResult result = algorithm.sort(new int[] {1, 2, 3, 4, 5});

		assertThat(result.comparisons()).as("sem parada antecipada: 4 + 3 + 2 + 1").isEqualTo(10);
		assertThat(result.swaps()).isZero();
		assertThat(result.steps()).anyMatch(step -> step.message().startsWith("Passagem ←"));
	}

	@Test
	void exposesMetadata() {
		assertThat(algorithm.getId()).isEqualTo("cocktail-shaker-sort");
		assertThat(algorithm.getName()).isEqualTo("Cocktail Shaker Sort");
		assertThat(algorithm.getComplexity()).isEqualTo(new Complexity("O(n²)", "O(n²)", "O(n²)", "O(1)"));
		assertThat(algorithm.isStable()).isTrue();
		assertThat(algorithm.isInPlace()).isTrue();
	}
}
