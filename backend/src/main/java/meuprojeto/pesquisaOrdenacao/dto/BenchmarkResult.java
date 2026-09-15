package meuprojeto.pesquisaOrdenacao.dto;

import meuprojeto.pesquisaOrdenacao.algorithm.BenchmarkInput;

/**
 * Uma célula do quadro comparativo: um algoritmo, um tamanho e um tipo de entrada.
 *
 * @param timeMs mediana do tempo das execuções, em milissegundos, sem registro de passos
 * @param runs   quantidade de execuções usadas no cálculo da mediana
 */
public record BenchmarkResult(
		String algorithm,
		String name,
		int size,
		BenchmarkInput input,
		double timeMs,
		int runs,
		long comparisons,
		long swaps,
		long moves) {
}
