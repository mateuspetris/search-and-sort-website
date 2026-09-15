package meuprojeto.pesquisaOrdenacao.algorithm;

public class SelectionSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "selection-sort";
	}

	@Override
	public String getName() {
		return "Selection Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity("O(n²)", "O(n²)", "O(n²)", "O(1)");
	}

	@Override
	public boolean isStable() {
		return false;
	}

	@Override
	public boolean isInPlace() {
		return true;
	}

	@Override
	public SortResult sort(int[] input) {
		int[] array = input.clone();
		StepRecorder recorder = new StepRecorder();

		for (int i = 0; i < array.length - 1; i++) {
			int minIndex = i;
			for (int j = i + 1; j < array.length; j++) {
				boolean newMinimum = array[j] < array[minIndex];
				recorder.comparison(array, j, minIndex, newMinimum
						? array[j] + " é menor que " + array[minIndex] + ". Novo menor elemento encontrado na posição " + j + "."
						: array[j] + " não é menor que " + array[minIndex] + ". O menor elemento continua na posição " + minIndex + ".");
				if (newMinimum) {
					minIndex = j;
				}
			}
			recorder.swap(array, i, minIndex, minIndex == i
					? "O menor elemento " + array[i] + " já está na posição " + i + ": troca consigo mesmo."
					: "O menor elemento " + array[minIndex] + " é movido para a posição " + i + ".");
		}

		return recorder.complete(array);
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long comparisons = 0;
		long swaps = 0;

		for (int i = 0; i < array.length - 1; i++) {
			int minIndex = i;
			for (int j = i + 1; j < array.length; j++) {
				comparisons++;
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}
			int temp = array[i];
			array[i] = array[minIndex];
			array[minIndex] = temp;
			swaps++;
		}

		return new SortCounts(comparisons, swaps, 3 * swaps);
	}
}
