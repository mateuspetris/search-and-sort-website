package meuprojeto.pesquisaOrdenacao.config;

import meuprojeto.pesquisaOrdenacao.algorithm.BubbleSort;
import meuprojeto.pesquisaOrdenacao.algorithm.CocktailShakerSort;
import meuprojeto.pesquisaOrdenacao.algorithm.HeapSort;
import meuprojeto.pesquisaOrdenacao.algorithm.InsertionSort;
import meuprojeto.pesquisaOrdenacao.algorithm.MergeSort;
import meuprojeto.pesquisaOrdenacao.algorithm.QuickSort;
import meuprojeto.pesquisaOrdenacao.algorithm.SelectionSort;
import meuprojeto.pesquisaOrdenacao.algorithm.ShellSort;
import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

/**
 * Registra os algoritmos disponíveis. As classes de algoritmo não conhecem o Spring;
 * adicionar um algoritmo novo exige apenas um novo método {@code @Bean} aqui.
 * {@code @Order} define a ordem da listagem em {@code GET /api/algorithms}.
 */
@Configuration
public class AlgorithmConfig {

	@Bean
	@Order(1)
	SortAlgorithm bubbleSort() {
		return new BubbleSort();
	}

	@Bean
	@Order(2)
	SortAlgorithm selectionSort() {
		return new SelectionSort();
	}

	@Bean
	@Order(3)
	SortAlgorithm insertionSort() {
		return new InsertionSort();
	}

	@Bean
	@Order(4)
	SortAlgorithm mergeSort() {
		return new MergeSort();
	}

	@Bean
	@Order(5)
	SortAlgorithm quickSort() {
		return new QuickSort();
	}

	@Bean
	@Order(6)
	SortAlgorithm shellSort() {
		return new ShellSort();
	}

	@Bean
	@Order(7)
	SortAlgorithm heapSort() {
		return new HeapSort();
	}

	@Bean
	@Order(8)
	SortAlgorithm cocktailShakerSort() {
		return new CocktailShakerSort();
	}
}
