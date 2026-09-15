package meuprojeto.pesquisaOrdenacao.algorithm;

import java.util.ArrayList;
import java.util.List;

public class StepRecorder {

	private static final int[] NONE = new int[0];
	private static final int SWAP_MOVES = 3;

	private final List<SortStep> steps = new ArrayList<>();
	private int comparisons;
	private int swaps;
	private int moves;
	private int pendingMoves;

	public void comparison(int[] array, int i, int j, String message) {
		comparison(array, i, j, null, message);
	}

	public void comparison(int[] array, int i, int j, Integer pivotIndex, String message) {
		comparisons++;
		record(OperationType.COMPARISON, array, new int[] {i, j}, new int[] {array[i], array[j]}, pivotIndex, 0,
				message);
	}

	public void comparison(int[] array, int[] indexes, int[] involvedValues, String message) {
		comparison(array, indexes, involvedValues, null, message);
	}

	public void comparison(int[] array, int[] indexes, int[] involvedValues, Integer pivotIndex, String message) {
		comparisons++;
		record(OperationType.COMPARISON, array, indexes, involvedValues, pivotIndex, 0, message);
	}

	public void swap(int[] array, int i, int j, String message) {
		swap(array, i, j, null, message);
	}

	public void swap(int[] array, int i, int j, Integer pivotIndex, String message) {
		int first = array[i];
		int second = array[j];
		array[i] = second;
		array[j] = first;
		swaps++;
		record(OperationType.SWAP, array, new int[] {i, j}, new int[] {first, second}, pivotIndex, SWAP_MOVES,
				message);
	}

	public void pivotSelected(int[] array, int pivotIndex, String message) {
		record(OperationType.PIVOT_SELECTED, array, new int[] {pivotIndex}, new int[] {array[pivotIndex]},
				pivotIndex, 0, message);
	}

	/** Registra o intervalo {@code [start, end]} (inclusivo) que foi dividido ou particionado. */
	public void partition(int[] array, int start, int end, Integer pivotIndex, String message) {
		record(OperationType.PARTITION, array, new int[] {start, end}, NONE, pivotIndex, 0, message);
	}

	/** Escreve {@code value} na posição {@code index} e registra o passo como INSERTION. */
	public void insertion(int[] array, int index, int value, String message) {
		write(OperationType.INSERTION, array, index, value, message);
	}

	/** Escreve {@code value} na posição {@code index} e registra o passo como MERGE. */
	public void merge(int[] array, int index, int value, String message) {
		write(OperationType.MERGE, array, index, value, message);
	}

	/**
	 * Conta movimentações que não aparecem como passo: cópia da chave, do pivô ou para o array auxiliar.
	 * Elas são somadas ao campo {@code moves} do próximo passo registrado.
	 */
	public void countMoves(int count) {
		moves += count;
		pendingMoves += count;
	}

	/** Registra o passo final e devolve o resultado completo da execução. */
	public SortResult complete(int[] array) {
		record(OperationType.COMPLETE, array, NONE, NONE, null, 0, "Ordenação concluída.");
		return new SortResult(array.clone(), List.copyOf(steps), comparisons, swaps, moves);
	}

	private void write(OperationType type, int[] array, int index, int value, String message) {
		array[index] = value;
		record(type, array, new int[] {index}, new int[] {value}, null, 1, message);
	}

	private void record(OperationType type, int[] array, int[] indexes, int[] involvedValues, Integer pivotIndex,
			int stepMoves, String message) {
		moves += stepMoves;
		steps.add(new SortStep(steps.size() + 1, type, array.clone(), indexes, involvedValues, pivotIndex,
				stepMoves + pendingMoves, message));
		pendingMoves = 0;
	}
}
