package meuprojeto.pesquisaOrdenacao.algorithm;

/**
 * Shell Sort com a sequência de gaps original de Shell: n/2, n/4, ..., 1.
 * As complexidades informadas valem para essa sequência.
 */
public class ShellSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "shell-sort";
	}

	@Override
	public String getName() {
		return "Shell Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity(
				"O(n log n) (gaps n/2, n/4, …, 1)",
				"Sem fórmula fechada (gaps n/2, n/4, …, 1)",
				"O(n²) (gaps n/2, n/4, …, 1)",
				"O(1)");
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

		for (int gap = array.length / 2; gap > 0; gap /= 2) {
			recorder.partition(array, 0, array.length - 1, null,
					"Gap = " + gap + ": elementos a " + gap + " posições de distância serão ordenados entre si.");
			gappedInsertionSort(array, gap, recorder);
		}

		return recorder.complete(array);
	}

	private void gappedInsertionSort(int[] array, int gap, StepRecorder recorder) {
		for (int i = gap; i < array.length; i++) {
			int key = array[i];
			recorder.countMoves(1);
			int j = i;
			while (j >= gap) {
				boolean mustShift = array[j - gap] > key;
				recorder.comparison(array, new int[] {j - gap, j}, new int[] {array[j - gap], key}, mustShift
						? array[j - gap] + " é maior que " + key + ". " + array[j - gap] + " será movido " + gap + " posições à direita."
						: array[j - gap] + " não é maior que " + key + ". Posição de inserção encontrada.");
				if (!mustShift) {
					break;
				}
				recorder.insertion(array, j, array[j - gap],
						array[j - gap] + " movido da posição " + (j - gap) + " para a posição " + j + ".");
				j -= gap;
			}
			recorder.insertion(array, j, key, key + " inserido na posição " + j + ".");
		}
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long comparisons = 0;
		long moves = 0;

		for (int gap = array.length / 2; gap > 0; gap /= 2) {
			for (int i = gap; i < array.length; i++) {
				int key = array[i];
				moves++;
				int j = i;
				while (j >= gap) {
					comparisons++;
					if (array[j - gap] <= key) {
						break;
					}
					array[j] = array[j - gap];
					moves++;
					j -= gap;
				}
				array[j] = key;
				moves++;
			}
		}

		return new SortCounts(comparisons, 0, moves);
	}
}
