package meuprojeto.pesquisaOrdenacao.algorithm;

/** Cocktail Shaker Sort em sua forma básica: passagens alternadas que fixam uma ponta por vez, sem parada antecipada. */
public class CocktailShakerSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "cocktail-shaker-sort";
	}

	@Override
	public String getName() {
		return "Cocktail Shaker Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity("O(n²)", "O(n²)", "O(n²)", "O(1)");
	}

	@Override
	public boolean isStable() {
		return true;
	}

	@Override
	public boolean isInPlace() {
		return true;
	}

	@Override
	public SortResult sort(int[] input) {
		int[] array = input.clone();
		StepRecorder recorder = new StepRecorder();

		int start = 0;
		int end = array.length - 1;

		while (start < end) {
			for (int j = start; j < end; j++) {
				compareAndSwap(array, j, "→", recorder);
			}
			end--;

			for (int j = end - 1; j >= start; j--) {
				compareAndSwap(array, j, "←", recorder);
			}
			start++;
		}

		return recorder.complete(array);
	}

	/** Compara as posições {@code j} e {@code j + 1}, trocando-as se estiverem fora de ordem. */
	private void compareAndSwap(int[] array, int j, String direction, StepRecorder recorder) {
		boolean outOfOrder = array[j] > array[j + 1];
		recorder.comparison(array, j, j + 1, "Passagem " + direction + ": " + (outOfOrder
				? array[j] + " é maior que " + array[j + 1] + ". Os elementos serão trocados."
				: array[j] + " não é maior que " + array[j + 1] + ". Nenhuma troca necessária."));
		if (outOfOrder) {
			recorder.swap(array, j, j + 1,
					"Passagem " + direction + ": troca entre as posições " + j + " e " + (j + 1) + ".");
		}
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long comparisons = 0;
		long swaps = 0;

		int start = 0;
		int end = array.length - 1;

		while (start < end) {
			for (int j = start; j < end; j++) {
				comparisons++;
				if (array[j] > array[j + 1]) {
					swap(array, j);
					swaps++;
				}
			}
			end--;

			for (int j = end - 1; j >= start; j--) {
				comparisons++;
				if (array[j] > array[j + 1]) {
					swap(array, j);
					swaps++;
				}
			}
			start++;
		}

		return new SortCounts(comparisons, swaps, 3 * swaps);
	}

	private static void swap(int[] array, int j) {
		int temp = array[j];
		array[j] = array[j + 1];
		array[j + 1] = temp;
	}
}
