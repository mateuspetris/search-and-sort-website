package meuprojeto.pesquisaOrdenacao.service;

import java.util.List;
import java.util.Objects;

import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;
import meuprojeto.pesquisaOrdenacao.algorithm.SortResult;
import meuprojeto.pesquisaOrdenacao.dto.ExecutionMetrics;
import meuprojeto.pesquisaOrdenacao.dto.ExecutionStep;
import meuprojeto.pesquisaOrdenacao.dto.SortRequest;
import meuprojeto.pesquisaOrdenacao.dto.SortResponse;
import meuprojeto.pesquisaOrdenacao.exception.InvalidArrayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ExecutionService {

	private static final double NANOS_PER_MILLI = 1_000_000.0;

	private final AlgorithmService algorithmService;
	private final int maxArraySize;

	public ExecutionService(AlgorithmService algorithmService,
			@Value("${sorting.max-array-size}") int maxArraySize) {
		this.algorithmService = algorithmService;
		this.maxArraySize = maxArraySize;
	}

	public SortResponse execute(String algorithmId, SortRequest request) {
		SortAlgorithm algorithm = algorithmService.getAlgorithm(algorithmId);
		int[] input = toValidatedArray(request);

		// O tempo inclui o registro dos passos: é um dado educativo, não uma medida de desempenho puro.
		long start = System.nanoTime();
		SortResult result = algorithm.sort(input);
		double executionTimeMs = (System.nanoTime() - start) / NANOS_PER_MILLI;

		ExecutionMetrics metrics = new ExecutionMetrics(result.comparisons(), result.swaps(), result.moves(),
				result.steps().size(), executionTimeMs, input.length);
		List<ExecutionStep> steps = result.steps().stream().map(ExecutionStep::from).toList();
		return new SortResponse(algorithm.getId(), input, result.finalArray(), metrics, steps);
	}

	private int[] toValidatedArray(SortRequest request) {
		List<Integer> values = request == null ? null : request.values();
		if (values == null) {
			throw new InvalidArrayException("The array cannot be null.");
		}
		if (values.isEmpty()) {
			throw new InvalidArrayException("The array cannot be empty.");
		}
		if (values.size() > maxArraySize) {
			throw new InvalidArrayException(
					"The array cannot have more than " + maxArraySize + " elements (received " + values.size() + ").");
		}
		if (values.stream().anyMatch(Objects::isNull)) {
			throw new InvalidArrayException("The array cannot contain null elements.");
		}
		return values.stream().mapToInt(Integer::intValue).toArray();
	}
}
