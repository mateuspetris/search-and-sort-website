package meuprojeto.pesquisaOrdenacao.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import meuprojeto.pesquisaOrdenacao.algorithm.BenchmarkInput;
import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;
import meuprojeto.pesquisaOrdenacao.algorithm.SortCounts;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkRequest;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkResponse;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkResult;
import meuprojeto.pesquisaOrdenacao.exception.InvalidBenchmarkException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Reproduz o quadro comparativo de tempos de Wirth: todos os algoritmos, com entradas ordenada,
 * aleatória e invertida, para cada tamanho N. Os algoritmos rodam sem registro de passos.
 */
@Service
public class BenchmarkService {

	static final List<Integer> DEFAULT_SIZES = List.of(256, 2048);
	static final long RANDOM_SEED = 42;
	private static final int MAX_SIZES = 4;
	private static final int MAX_RUNS = 500;
	private static final long MIN_TOTAL_NANOS = 20_000_000;
	private static final int WARMUP_SIZE = 512;
	private static final int WARMUP_ROUNDS = 20;
	private static final double NANOS_PER_MILLI = 1_000_000.0;

	private final List<SortAlgorithm> algorithms;
	private final int maxSize;
	private final int minRuns;

	public BenchmarkService(List<SortAlgorithm> algorithms, @Value("${benchmark.max-size}") int maxSize,
			@Value("${benchmark.min-runs}") int minRuns) {
		this.algorithms = algorithms;
		this.maxSize = maxSize;
		this.minRuns = minRuns;
	}

	public BenchmarkResponse run(BenchmarkRequest request) {
		List<Integer> sizes = validatedSizes(request);
		List<BenchmarkInput> inputs = List.of(BenchmarkInput.values());

		warmUp();

		List<BenchmarkResult> results = new ArrayList<>();
		for (int size : sizes) {
			for (BenchmarkInput input : inputs) {
				int[] values = input.generate(size, RANDOM_SEED);
				for (SortAlgorithm algorithm : algorithms) {
					results.add(measure(algorithm, size, input, values));
				}
			}
		}
		return new BenchmarkResponse(sizes, inputs, results);
	}

	/**
	 * Executa ao menos {@code minRuns} vezes e continua até somar {@value #MIN_TOTAL_NANOS} ns,
	 * para que algoritmos de poucos microssegundos também tenham uma mediana estável.
	 */
	private BenchmarkResult measure(SortAlgorithm algorithm, int size, BenchmarkInput input, int[] values) {
		long[] durations = new long[MAX_RUNS];
		long total = 0;
		int runs = 0;
		SortCounts counts = null;
		while (runs < MAX_RUNS && (runs < minRuns || total < MIN_TOTAL_NANOS)) {
			long start = System.nanoTime();
			counts = algorithm.countOperations(values);
			durations[runs] = System.nanoTime() - start;
			total += durations[runs];
			runs++;
		}
		double timeMs = median(Arrays.copyOf(durations, runs)) / NANOS_PER_MILLI;
		return new BenchmarkResult(algorithm.getId(), algorithm.getName(), size, input, timeMs, runs,
				counts.comparisons(), counts.swaps(), counts.moves());
	}

	/** Dá ao JIT a chance de compilar os algoritmos antes das medições. */
	private void warmUp() {
		for (BenchmarkInput input : BenchmarkInput.values()) {
			int[] values = input.generate(WARMUP_SIZE, RANDOM_SEED);
			for (int round = 0; round < WARMUP_ROUNDS; round++) {
				for (SortAlgorithm algorithm : algorithms) {
					algorithm.countOperations(values);
				}
			}
		}
	}

	private List<Integer> validatedSizes(BenchmarkRequest request) {
		List<Integer> sizes = request == null || request.sizes() == null || request.sizes().isEmpty()
				? DEFAULT_SIZES
				: request.sizes();
		if (sizes.stream().anyMatch(Objects::isNull)) {
			throw new InvalidBenchmarkException("Benchmark sizes cannot contain null values.");
		}
		List<Integer> distinct = sizes.stream().distinct().sorted().toList();
		if (distinct.size() > MAX_SIZES) {
			throw new InvalidBenchmarkException("A benchmark accepts at most " + MAX_SIZES + " different sizes.");
		}
		for (int size : distinct) {
			if (size < 1 || size > maxSize) {
				throw new InvalidBenchmarkException(
						"Benchmark sizes must be between 1 and " + maxSize + " (received " + size + ").");
			}
		}
		return distinct;
	}

	private static long median(long[] values) {
		Arrays.sort(values);
		int middle = values.length / 2;
		return values.length % 2 == 1 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
	}
}
