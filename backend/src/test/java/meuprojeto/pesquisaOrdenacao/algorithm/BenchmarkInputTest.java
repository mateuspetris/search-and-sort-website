package meuprojeto.pesquisaOrdenacao.algorithm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;

class BenchmarkInputTest {

	@Test
	void orderedAndReversed() {
		assertThat(BenchmarkInput.ORDERED.generate(5, 1)).containsExactly(1, 2, 3, 4, 5);
		assertThat(BenchmarkInput.REVERSED.generate(5, 1)).containsExactly(5, 4, 3, 2, 1);
	}

	@Test
	void randomIsAReproduciblePermutation() {
		int[] first = BenchmarkInput.RANDOM.generate(256, 42);
		int[] second = BenchmarkInput.RANDOM.generate(256, 42);

		assertThat(first).containsExactly(second);
		assertThat(first).isNotEqualTo(BenchmarkInput.ORDERED.generate(256, 42));
		int[] sorted = first.clone();
		Arrays.sort(sorted);
		assertThat(sorted).containsExactly(IntStream.rangeClosed(1, 256).toArray());
	}
}
