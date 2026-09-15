package meuprojeto.pesquisaOrdenacao.algorithm;

/**
 * Quick Sort como apresentado por Wirth: o pivô é o elemento do meio do intervalo e dois índices
 * avançam um em direção ao outro, trocando elementos que estão do lado errado do pivô.
 */
public class QuickSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "quick-sort";
	}

	@Override
	public String getName() {
		return "Quick Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity("O(n log n)", "O(n log n)", "O(n²)", "O(log n)");
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

		quickSort(array, 0, array.length - 1, recorder);

		return recorder.complete(array);
	}

	private void quickSort(int[] array, int low, int high, StepRecorder recorder) {
		if (low >= high) {
			return;
		}
		int mid = low + (high - low) / 2;
		int pivot = array[mid];
		recorder.countMoves(1);
		recorder.pivotSelected(array, mid,
				"Pivô " + pivot + " (posição " + mid + ", meio do intervalo [" + low + ".." + high + "]).");

		int pivotPosition = mid;
		int i = low;
		int j = high;
		do {
			while (isLessThanPivot(array, i, pivot, pivotPosition, recorder)) {
				i++;
			}
			while (isGreaterThanPivot(array, j, pivot, pivotPosition, recorder)) {
				j--;
			}
			if (i <= j) {
				int newPivotPosition = pivotPosition == i ? j : pivotPosition == j ? i : pivotPosition;
				recorder.swap(array, i, j, newPivotPosition, i == j
						? "i e j chegaram à mesma posição " + i + ": " + array[i] + " troca consigo mesmo."
						: array[i] + " (posição " + i + ") e " + array[j] + " (posição " + j
								+ ") estão do lado errado do pivô " + pivot + " e são trocados.");
				pivotPosition = newPivotPosition;
				i++;
				j--;
			}
		} while (i <= j);

		recorder.partition(array, low, high, null,
				"Intervalo [" + low + ".." + high + "] dividido em torno do pivô " + pivot + ": [" + low + ".." + j
						+ "] ≤ " + pivot + " e [" + i + ".." + high + "] ≥ " + pivot + ".");

		quickSort(array, low, j, recorder);
		quickSort(array, i, high, recorder);
	}

	private boolean isLessThanPivot(int[] array, int i, int pivot, int pivotPosition, StepRecorder recorder) {
		boolean less = array[i] < pivot;
		recorder.comparison(array, new int[] {i}, new int[] {array[i], pivot}, pivotPosition, less
				? array[i] + " < pivô " + pivot + ": já está à esquerda, o índice i avança."
				: array[i] + " ≥ pivô " + pivot + ": o índice i para na posição " + i + ".");
		return less;
	}

	private boolean isGreaterThanPivot(int[] array, int j, int pivot, int pivotPosition, StepRecorder recorder) {
		boolean greater = pivot < array[j];
		recorder.comparison(array, new int[] {j}, new int[] {array[j], pivot}, pivotPosition, greater
				? array[j] + " > pivô " + pivot + ": já está à direita, o índice j recua."
				: array[j] + " ≤ pivô " + pivot + ": o índice j para na posição " + j + ".");
		return greater;
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long[] counters = new long[3]; // [comparações, trocas, movimentações]
		countingQuickSort(array, 0, array.length - 1, counters);
		return new SortCounts(counters[0], counters[1], counters[2]);
	}

	private void countingQuickSort(int[] array, int low, int high, long[] counters) {
		if (low >= high) {
			return;
		}
		int pivot = array[low + (high - low) / 2];
		counters[2]++;

		int i = low;
		int j = high;
		do {
			while (true) {
				counters[0]++;
				if (array[i] >= pivot) {
					break;
				}
				i++;
			}
			while (true) {
				counters[0]++;
				if (pivot >= array[j]) {
					break;
				}
				j--;
			}
			if (i <= j) {
				int temp = array[i];
				array[i] = array[j];
				array[j] = temp;
				counters[1]++;
				counters[2] += 3;
				i++;
				j--;
			}
		} while (i <= j);

		countingQuickSort(array, low, j, counters);
		countingQuickSort(array, i, high, counters);
	}
}
