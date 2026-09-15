package meuprojeto.pesquisaOrdenacao.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Arrays;
import java.util.List;

import meuprojeto.pesquisaOrdenacao.algorithm.BenchmarkInput;
import meuprojeto.pesquisaOrdenacao.algorithm.BubbleSort;
import meuprojeto.pesquisaOrdenacao.algorithm.QuickSort;
import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;
import meuprojeto.pesquisaOrdenacao.algorithm.SortCounts;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkRequest;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkResponse;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkResult;
import meuprojeto.pesquisaOrdenacao.exception.InvalidBenchmarkException;
import org.junit.jupiter.api.Test;

class BenchmarkServiceTest {

	private final List<SortAlgorithm> algorithms = List.of(new BubbleSort(), new QuickSort());
	private final BenchmarkService service = new BenchmarkService(algorithms, 4096, 3);

	@Test
	void usesWirthSizesByDefault() {
		BenchmarkResponse response = service.run(null);

		assertThat(response.sizes()).containsExactly(256, 2048);
		assertThat(response.inputs()).containsExactly(BenchmarkInput.ORDERED, BenchmarkInput.RANDOM,
				BenchmarkInput.REVERSED);
		assertThat(response.results()).hasSize(2 * 3 * 2);
	}

	@Test
	void producesOneResultPerSizeInputAndAlgorithm() {
		BenchmarkResponse response = service.run(new BenchmarkRequest(List.of(128, 32, 128)));

		assertThat(response.sizes()).containsExactly(32, 128);
		assertThat(response.results())
				.extracting(r -> r.size() + "/" + r.input() + "/" + r.algorithm())
				.containsExactly(
						"32/ORDERED/bubble-sort", "32/ORDERED/quick-sort",
						"32/RANDOM/bubble-sort", "32/RANDOM/quick-sort",
						"32/REVERSED/bubble-sort", "32/REVERSED/quick-sort",
						"128/ORDERED/bubble-sort", "128/ORDERED/quick-sort",
						"128/RANDOM/bubble-sort", "128/RANDOM/quick-sort",
						"128/REVERSED/bubble-sort", "128/REVERSED/quick-sort");
	}

	@Test
	void reportsCountsOfTheSameInputAndMedianTime() {
		BenchmarkResult result = service.run(new BenchmarkRequest(List.of(100))).results().stream()
				.filter(r -> r.algorithm().equals("bubble-sort") && r.input() == BenchmarkInput.REVERSED)
				.findFirst()
				.orElseThrow();

		SortCounts expected = new BubbleSort().countOperations(BenchmarkInput.REVERSED.generate(100, 42));
		assertThat(result.comparisons()).isEqualTo(expected.comparisons()).isEqualTo(4950);
		assertThat(result.swaps()).isEqualTo(expected.swaps());
		assertThat(result.moves()).isEqualTo(expected.moves()).isEqualTo(3 * 4950);
		assertThat(result.runs()).isGreaterThanOrEqualTo(3);
		assertThat(result.timeMs()).isPositive();
		assertThat(result.name()).isEqualTo("Bubble Sort");
	}

	@Test
	void rejectsInvalidSizes() {
		assertThatThrownBy(() -> service.run(new BenchmarkRequest(List.of(0))))
				.isInstanceOf(InvalidBenchmarkException.class)
				.hasMessage("Benchmark sizes must be between 1 and 4096 (received 0).");
		assertThatThrownBy(() -> service.run(new BenchmarkRequest(List.of(4097))))
				.isInstanceOf(InvalidBenchmarkException.class);
		assertThatThrownBy(() -> service.run(new BenchmarkRequest(List.of(1, 2, 3, 4, 5))))
				.isInstanceOf(InvalidBenchmarkException.class)
				.hasMessage("A benchmark accepts at most 4 different sizes.");
		assertThatThrownBy(() -> service.run(new BenchmarkRequest(Arrays.asList(8, null))))
				.isInstanceOf(InvalidBenchmarkException.class);
	}
}
