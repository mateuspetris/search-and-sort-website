package meuprojeto.pesquisaOrdenacao.algorithm;

public class InsertionSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "insertion-sort";
	}

	@Override
	public String getName() {
		return "Insertion Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity("O(n)", "O(n²)", "O(n²)", "O(1)");
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

		for (int i = 1; i < array.length; i++) {
			int key = array[i];
			recorder.countMoves(1);
			int j = i - 1;
			while (j >= 0) {
				boolean mustShift = array[j] > key;
				recorder.comparison(array, new int[] {j, j + 1}, new int[] {array[j], key}, mustShift
						? array[j] + " é maior que " + key + ". " + array[j] + " será deslocado para a direita."
						: array[j] + " não é maior que " + key + ". Posição de inserção encontrada.");
				if (!mustShift) {
					break;
				}
				recorder.insertion(array, j + 1, array[j], array[j] + " deslocado para a posição " + (j + 1) + ".");
				j--;
			}
			recorder.insertion(array, j + 1, key, key + " inserido na posição " + (j + 1) + ".");
		}

		return recorder.complete(array);
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long comparisons = 0;
		long moves = 0;

		for (int i = 1; i < array.length; i++) {
			int key = array[i];
			moves++;
			int j = i - 1;
			while (j >= 0) {
				comparisons++;
				if (array[j] <= key) {
					break;
				}
				array[j + 1] = array[j];
				moves++;
				j--;
			}
			array[j + 1] = key;
			moves++;
		}

		return new SortCounts(comparisons, 0, moves);
	}
}
