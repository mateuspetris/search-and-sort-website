package meuprojeto.pesquisaOrdenacao.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

import meuprojeto.pesquisaOrdenacao.algorithm.OperationType;
import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;
import meuprojeto.pesquisaOrdenacao.algorithm.SortResult;
import meuprojeto.pesquisaOrdenacao.algorithm.SortStep;
import meuprojeto.pesquisaOrdenacao.dto.ExecutionStep;
import meuprojeto.pesquisaOrdenacao.dto.SortRequest;
import meuprojeto.pesquisaOrdenacao.dto.SortResponse;
import meuprojeto.pesquisaOrdenacao.exception.AlgorithmNotFoundException;
import meuprojeto.pesquisaOrdenacao.exception.InvalidArrayException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExecutionServiceTest {

	private static final int MAX_SIZE = 5;

	private final AlgorithmService algorithmService = mock(AlgorithmService.class);
	private final SortAlgorithm algorithm = mock(SortAlgorithm.class);
	private final ExecutionService service = new ExecutionService(algorithmService, MAX_SIZE);

	@BeforeEach
	void setUp() {
		when(algorithmService.getAlgorithm("fake-sort")).thenReturn(algorithm);
		when(algorithm.getId()).thenReturn("fake-sort");
	}

	@Test
	void buildsResponseFromAlgorithmResult() {
		SortStep comparison = new SortStep(1, OperationType.COMPARISON, new int[] {2, 1}, new int[] {0, 1},
				new int[] {2, 1}, null, 0, "compara");
		SortStep swap = new SortStep(2, OperationType.SWAP, new int[] {1, 2}, new int[] {0, 1}, new int[] {2, 1},
				null, 3, "troca");
		SortStep complete = new SortStep(3, OperationType.COMPLETE, new int[] {1, 2}, new int[0], new int[0], null, 0,
				"fim");
		when(algorithm.sort(any())).thenReturn(new SortResult(new int[] {1, 2}, List.of(comparison, swap, complete), 1, 1, 3));

		SortResponse response = service.execute("fake-sort", new SortRequest(List.of(2, 1)));

		assertThat(response.algorithm()).isEqualTo("fake-sort");
		assertThat(response.initialArray()).containsExactly(2, 1);
		assertThat(response.finalArray()).containsExactly(1, 2);
		assertThat(response.metrics().comparisons()).isEqualTo(1);
		assertThat(response.metrics().swaps()).isEqualTo(1);
		assertThat(response.metrics().moves()).isEqualTo(3);
		assertThat(response.metrics().totalSteps()).isEqualTo(3);
		assertThat(response.metrics().inputSize()).isEqualTo(2);
		assertThat(response.metrics().executionTimeMs()).isGreaterThanOrEqualTo(0);
		assertThat(response.steps()).containsExactly(ExecutionStep.from(comparison), ExecutionStep.from(swap),
				ExecutionStep.from(complete));
	}

	@Test
	void acceptsArrayExactlyAtLimit() {
		int[] values = IntStream.rangeClosed(1, MAX_SIZE).toArray();
		when(algorithm.sort(any())).thenReturn(new SortResult(values, List.of(), 0, 0, 0));

		SortResponse response = service.execute("fake-sort", new SortRequest(Arrays.stream(values).boxed().toList()));

		assertThat(response.metrics().inputSize()).isEqualTo(MAX_SIZE);
	}

	@Test
	void rejectsMissingRequestOrNullValues() {
		assertInvalid(null, "The array cannot be null.");
		assertInvalid(new SortRequest(null), "The array cannot be null.");
	}

	@Test
	void rejectsEmptyArray() {
		assertInvalid(new SortRequest(List.of()), "The array cannot be empty.");
	}

	@Test
	void rejectsArrayAboveLimit() {
		List<Integer> values = IntStream.rangeClosed(1, MAX_SIZE + 1).boxed().toList();

		assertInvalid(new SortRequest(values), "The array cannot have more than 5 elements (received 6).");
	}

	@Test
	void rejectsNullElements() {
		assertInvalid(new SortRequest(Arrays.asList(1, null, 3)), "The array cannot contain null elements.");
	}

	@Test
	void unknownAlgorithmIsReportedBeforeValidatingArray() {
		when(algorithmService.getAlgorithm("unknown")).thenThrow(new AlgorithmNotFoundException("unknown"));

		assertThatThrownBy(() -> service.execute("unknown", new SortRequest(Collections.emptyList())))
				.isInstanceOf(AlgorithmNotFoundException.class);
	}

	private void assertInvalid(SortRequest request, String message) {
		assertThatThrownBy(() -> service.execute("fake-sort", request))
				.isInstanceOf(InvalidArrayException.class)
				.hasMessage(message);
		verify(algorithm, never()).sort(any());
	}
}
