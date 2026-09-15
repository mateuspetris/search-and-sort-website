package meuprojeto.pesquisaOrdenacao.dto;

import meuprojeto.pesquisaOrdenacao.algorithm.Complexity;
import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;

public record AlgorithmInfo(
		String id,
		String name,
		String bestCase,
		String averageCase,
		String worstCase,
		String spaceComplexity,
		boolean stable,
		boolean inPlace) {

	public static AlgorithmInfo from(SortAlgorithm algorithm) {
		Complexity complexity = algorithm.getComplexity();
		return new AlgorithmInfo(algorithm.getId(), algorithm.getName(), complexity.bestCase(),
				complexity.averageCase(), complexity.worstCase(), complexity.space(), algorithm.isStable(),
				algorithm.isInPlace());
	}
}
