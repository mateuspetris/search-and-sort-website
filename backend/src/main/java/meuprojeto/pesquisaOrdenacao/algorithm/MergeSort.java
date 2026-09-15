package meuprojeto.pesquisaOrdenacao.algorithm;

/** Merge Sort top-down recursivo com um único array auxiliar de tamanho n. */
public class MergeSort implements SortAlgorithm {

	@Override
	public String getId() {
		return "merge-sort";
	}

	@Override
	public String getName() {
		return "Merge Sort";
	}

	@Override
	public Complexity getComplexity() {
		return new Complexity("O(n log n)", "O(n log n)", "O(n log n)", "O(n)");
	}

	@Override
	public boolean isStable() {
		return true;
	}

	@Override
	public boolean isInPlace() {
		return false;
	}

	@Override
	public SortResult sort(int[] input) {
		int[] array = input.clone();
		StepRecorder recorder = new StepRecorder();

		mergeSort(array, new int[array.length], 0, array.length - 1, recorder);

		return recorder.complete(array);
	}

	private void mergeSort(int[] array, int[] aux, int low, int high, StepRecorder recorder) {
		if (low >= high) {
			return;
		}
		int mid = low + (high - low) / 2;
		recorder.partition(array, low, high, null,
				"Dividindo [" + low + ".." + high + "] em [" + low + ".." + mid + "] e [" + (mid + 1) + ".." + high + "].");
		mergeSort(array, aux, low, mid, recorder);
		mergeSort(array, aux, mid + 1, high, recorder);
		merge(array, aux, low, mid, high, recorder);
	}

	private void merge(int[] array, int[] aux, int low, int mid, int high, StepRecorder recorder) {
		System.arraycopy(array, low, aux, low, high - low + 1);
		recorder.countMoves(high - low + 1);

		int left = low;
		int right = mid + 1;
		int k = low;

		while (left <= mid && right <= high) {
			boolean takeLeft = aux[left] <= aux[right];
			recorder.comparison(array, new int[] {k}, new int[] {aux[left], aux[right]}, takeLeft
					? aux[left] + " (esquerda) ≤ " + aux[right] + " (direita). " + aux[left] + " vai para a posição " + k + "."
					: aux[right] + " (direita) < " + aux[left] + " (esquerda). " + aux[right] + " vai para a posição " + k + ".");
			int value = takeLeft ? aux[left++] : aux[right++];
			recorder.merge(array, k, value, value + " colocado na posição " + k + ".");
			k++;
		}
		while (left <= mid) {
			recorder.merge(array, k, aux[left], aux[left] + " restante da metade esquerda colocado na posição " + k + ".");
			left++;
			k++;
		}
		while (right <= high) {
			recorder.merge(array, k, aux[right], aux[right] + " restante da metade direita colocado na posição " + k + ".");
			right++;
			k++;
		}
	}

	@Override
	public SortCounts countOperations(int[] input) {
		int[] array = input.clone();
		long[] counters = new long[2]; // [comparações, movimentações]
		countingMergeSort(array, new int[array.length], 0, array.length - 1, counters);
		return new SortCounts(counters[0], 0, counters[1]);
	}

	private void countingMergeSort(int[] array, int[] aux, int low, int high, long[] counters) {
		if (low >= high) {
			return;
		}
		int mid = low + (high - low) / 2;
		countingMergeSort(array, aux, low, mid, counters);
		countingMergeSort(array, aux, mid + 1, high, counters);

		System.arraycopy(array, low, aux, low, high - low + 1);
		counters[1] += high - low + 1;

		int left = low;
		int right = mid + 1;
		int k = low;
		while (left <= mid && right <= high) {
			counters[0]++;
			array[k++] = aux[left] <= aux[right] ? aux[left++] : aux[right++];
		}
		while (left <= mid) {
			array[k++] = aux[left++];
		}
		while (right <= high) {
			array[k++] = aux[right++];
		}
		counters[1] += high - low + 1;
	}
}
