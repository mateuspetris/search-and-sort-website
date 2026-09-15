package meuprojeto.pesquisaOrdenacao.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;

import meuprojeto.pesquisaOrdenacao.algorithm.BubbleSort;
import meuprojeto.pesquisaOrdenacao.algorithm.QuickSort;
import meuprojeto.pesquisaOrdenacao.dto.AlgorithmInfo;
import meuprojeto.pesquisaOrdenacao.exception.AlgorithmNotFoundException;
import org.junit.jupiter.api.Test;

class AlgorithmServiceTest {

	private final AlgorithmService service = new AlgorithmService(List.of(new BubbleSort(), new QuickSort()));

	@Test
	void listsAlgorithmsInRegistrationOrder() {
		assertThat(service.findAll()).extracting(AlgorithmInfo::id).containsExactly("bubble-sort", "quick-sort");
	}

	@Test
	void mapsAlgorithmMetadataToInfo() {
		AlgorithmInfo info = service.findInfo("quick-sort");

		assertThat(info).isEqualTo(new AlgorithmInfo("quick-sort", "Quick Sort", "O(n log n)", "O(n log n)",
				"O(n²)", "O(log n)", false, true));
	}

	@Test
	void resolvesAlgorithmById() {
		assertThat(service.getAlgorithm("bubble-sort")).isInstanceOf(BubbleSort.class);
	}

	@Test
	void unknownIdThrowsAlgorithmNotFound() {
		assertThatThrownBy(() -> service.getAlgorithm("unknown-sort"))
				.isInstanceOf(AlgorithmNotFoundException.class)
				.hasMessage("Algorithm 'unknown-sort' was not found.");
		assertThatThrownBy(() -> service.findInfo("unknown-sort")).isInstanceOf(AlgorithmNotFoundException.class);
	}

	@Test
	void duplicateIdsAreRejectedAtStartup() {
		assertThatThrownBy(() -> new AlgorithmService(List.of(new BubbleSort(), new BubbleSort())))
				.isInstanceOf(IllegalStateException.class)
				.hasMessageContaining("bubble-sort");
	}
}
