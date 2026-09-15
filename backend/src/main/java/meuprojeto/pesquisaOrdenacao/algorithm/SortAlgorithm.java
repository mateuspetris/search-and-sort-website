package meuprojeto.pesquisaOrdenacao.algorithm;

public interface SortAlgorithm {

	String getId();

	String getName();

	Complexity getComplexity();

	boolean isStable();

	boolean isInPlace();

	SortResult sort(int[] input);

	SortCounts countOperations(int[] input);
}
