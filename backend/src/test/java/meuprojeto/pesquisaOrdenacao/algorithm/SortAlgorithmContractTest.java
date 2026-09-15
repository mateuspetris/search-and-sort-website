package meuprojeto.pesquisaOrdenacao.algorithm;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTimeoutPreemptively;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

/** Regras que todo {@link SortAlgorithm} deve cumprir, verificadas para os 8 algoritmos em cada entrada. */
class SortAlgorithmContractTest {

	private static final List<SortAlgorithm> ALGORITHMS = List.of(new BubbleSort(), new SelectionSort(),
			new InsertionSort(), new MergeSort(), new QuickSort(), new ShellSort(), new HeapSort(),
			new CocktailShakerSort());

	private static final List<Arguments> INPUTS = List.of(
			Arguments.of("comum", new int[] {8, 3, 7, 4, 9, 2, 6, 5}),
			Arguments.of("já ordenado", new int[] {1, 2, 3, 4, 5}),
			Arguments.of("invertido", new int[] {5, 4, 3, 2, 1}),
			Arguments.of("duplicados", new int[] {4, 2, 4, 1, 2}),
			Arguments.of("negativos", new int[] {-5, 3, -1, 8, 0, -2}),
			Arguments.of("um elemento", new int[] {5}),
			Arguments.of("vazio", new int[] {}),
			Arguments.of("todos iguais", new int[] {1, 1, 1}),
			Arguments.of("negativos invertidos", new int[] {-1, -2, -3}),
			Arguments.of("extremos de int", new int[] {Integer.MAX_VALUE, Integer.MIN_VALUE, 0}),
			Arguments.of("dois elementos", new int[] {2, 1}),
			Arguments.of("tamanho ímpar", new int[] {9, 7, 5, 3, 1, 2, 4, 6, 8}),
			Arguments.of("grande aleatório", new Random(42).ints(500, -1000, 1000).toArray()),
			Arguments.of("grande ordenado", IntStream.rangeClosed(1, 256).toArray()),
			Arguments.of("grande invertido", IntStream.rangeClosed(1, 256).map(i -> 257 - i).toArray()),
			Arguments.of("muitos duplicados", new Random(7).ints(300, 0, 5).toArray()));

	static Stream<Arguments> algorithmsAndInputs() {
		return ALGORITHMS.stream().flatMap(algorithm -> INPUTS.stream()
				.map(input -> Arguments.of(algorithm.getName(), input.get()[0], algorithm, input.get()[1])));
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void sortsCorrectly(String name, String inputName, SortAlgorithm algorithm, int[] input) {
		int[] expected = input.clone();
		Arrays.sort(expected);

		SortResult result = assertTimeoutPreemptively(Duration.ofSeconds(5), () -> algorithm.sort(input));

		assertThat(result.finalArray()).containsExactly(expected);
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void doesNotModifyInput(String name, String inputName, SortAlgorithm algorithm, int[] input) {
		int[] original = input.clone();

		algorithm.sort(input);

		assertThat(input).containsExactly(original);
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void endsWithSingleCompleteStepHoldingFinalArray(String name, String inputName, SortAlgorithm algorithm,
			int[] input) {
		SortResult result = algorithm.sort(input);

		SortStep last = result.steps().getLast();
		assertThat(last.type()).isEqualTo(OperationType.COMPLETE);
		assertThat(last.values()).containsExactly(result.finalArray());
		assertThat(StepAssertions.count(result, OperationType.COMPLETE)).isEqualTo(1);
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void numbersStepsSequentiallyFromOne(String name, String inputName, SortAlgorithm algorithm, int[] input) {
		SortResult result = algorithm.sort(input);

		List<Integer> numbers = result.steps().stream().map(SortStep::step).toList();
		assertThat(numbers).isEqualTo(IntStream.rangeClosed(1, result.steps().size()).boxed().toList());
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void metricsMatchRecordedSteps(String name, String inputName, SortAlgorithm algorithm, int[] input) {
		SortResult result = algorithm.sort(input);

		assertThat(result.comparisons()).isEqualTo(StepAssertions.count(result, OperationType.COMPARISON));
		assertThat(result.swaps()).isEqualTo(StepAssertions.count(result, OperationType.SWAP));
		assertThat(result.moves()).isEqualTo(result.steps().stream().mapToInt(SortStep::moves).sum());
		assertThat(result.moves()).isGreaterThanOrEqualTo(3 * result.swaps());
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void countOperationsMatchesInstrumentedExecution(String name, String inputName, SortAlgorithm algorithm,
			int[] input) {
		int[] original = input.clone();

		SortResult traced = algorithm.sort(input);
		SortCounts counts = algorithm.countOperations(input);

		assertThat(counts).isEqualTo(new SortCounts(traced.comparisons(), traced.swaps(), traced.moves()));
		assertThat(input).containsExactly(original);
	}

	@ParameterizedTest(name = "{0} — {1}")
	@MethodSource("algorithmsAndInputs")
	void everyStepIsWellFormed(String name, String inputName, SortAlgorithm algorithm, int[] input) {
		SortResult result = algorithm.sort(input);

		for (SortStep step : result.steps()) {
			assertThat(step.values()).hasSize(input.length);
			for (int index : step.indexes()) {
				assertThat(index).isBetween(0, input.length - 1);
			}
			assertThat(step.message()).isNotBlank();
			if (step.pivotIndex() != null) {
				assertThat(step.pivotIndex()).isBetween(0, input.length - 1);
			}
		}
	}
}
