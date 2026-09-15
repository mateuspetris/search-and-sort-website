package meuprojeto.pesquisaOrdenacao.algorithm;

/** Heap Sort in-place usando um Max Heap representado no próprio array. */
public class HeapSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "heap-sort";
	}

	@Override
	public String getName() {
		return "Heap Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity("O(n log n)", "O(n log n)", "O(n log n)", "O(1)");
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

		for (int root = array.length / 2 - 1; root >= 0; root--) {
			heapify(array, root, array.length, recorder);
		}

		for (int end = array.length - 1; end > 0; end--) {
			recorder.swap(array, 0, end,
					"Raiz do heap (" + array[0] + ", maior elemento) movida para a posição final " + end
							+ ". O heap é reduzido para " + end + " elementos.");
			heapify(array, 0, end, recorder);
		}

		return recorder.complete(array);
	}

	/** Restaura a propriedade de Max Heap a partir de {@code root}, considerando apenas as primeiras {@code size} posições. */
	private void heapify(int[] array, int root, int size, StepRecorder recorder) {
		while (true) {
			int largest = root;
			largest = compareChild(array, 2 * root + 1, largest, size, recorder);
			largest = compareChild(array, 2 * root + 2, largest, size, recorder);
			if (largest == root) {
				return;
			}
			recorder.swap(array, root, largest,
					"Heapify: " + array[largest] + " sobe para a posição " + root + " e " + array[root] + " desce para a posição " + largest + ".");
			root = largest;
		}
	}

	private int compareChild(int[] array, int child, int largest, int size, StepRecorder recorder) {
		if (child >= size) {
			return largest;
		}
		boolean childIsLarger = array[child] > array[largest];
		recorder.comparison(array, child, largest, childIsLarger
				? "Heapify: filho " + array[child] + " é maior que " + array[largest] + "."
				: "Heapify: filho " + array[child] + " não é maior que " + array[largest] + ".");
		return childIsLarger ? child : largest;
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long[] counters = new long[2]; // [comparações, trocas]

		for (int root = array.length / 2 - 1; root >= 0; root--) {
			countingHeapify(array, root, array.length, counters);
		}
		for (int end = array.length - 1; end > 0; end--) {
			swap(array, 0, end);
			counters[1]++;
			countingHeapify(array, 0, end, counters);
		}

		return new SortCounts(counters[0], counters[1], 3 * counters[1]);
	}

	private void countingHeapify(int[] array, int root, int size, long[] counters) {
		while (true) {
			int largest = root;
			int left = 2 * root + 1;
			int right = 2 * root + 2;
			if (left < size) {
				counters[0]++;
				if (array[left] > array[largest]) {
					largest = left;
				}
			}
			if (right < size) {
				counters[0]++;
				if (array[right] > array[largest]) {
					largest = right;
				}
			}
			if (largest == root) {
				return;
			}
			swap(array, root, largest);
			counters[1]++;
			root = largest;
		}
	}

	private static void swap(int[] array, int i, int j) {
		int temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
