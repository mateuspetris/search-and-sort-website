package meuprojeto.pesquisaOrdenacao.algorithm;

public class BubbleSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "bubble-sort";
	}

	@Override
	public String getName() {
		return "Bubble Sort";
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

		for (int pass = 0; pass < array.length - 1; pass++) {
			for (int j = 0; j < array.length - 1 - pass; j++) {
				boolean outOfOrder = array[j] > array[j + 1];
				recorder.comparison(array, j, j + 1, outOfOrder
						? array[j] + " é maior que " + array[j + 1] + ". Os elementos serão trocados."
						: array[j] + " não é maior que " + array[j + 1] + ". Nenhuma troca necessária.");
				if (outOfOrder) {
					recorder.swap(array, j, j + 1, "Troca entre as posições " + j + " e " + (j + 1) + ".");
				}
			}
		}

		return recorder.complete(array);
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long comparisons = 0;
		long swaps = 0;

		for (int pass = 0; pass < array.length - 1; pass++) {
			for (int j = 0; j < array.length - 1 - pass; j++) {
				comparisons++;
				if (array[j] > array[j + 1]) {
					int temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
					swaps++;
				}
			}
		}

		return new SortCounts(comparisons, swaps, 3 * swaps);
	}
}
