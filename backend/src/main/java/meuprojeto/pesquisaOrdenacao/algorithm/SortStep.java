package meuprojeto.pesquisaOrdenacao.algorithm;

/**
 * @param step           posição do evento na linha do tempo (começa em 1)
 * @param type           operação realizada
 * @param values         estado do array logo após a operação
 * @param indexes        posições do array envolvidas na operação
 * @param involvedValues valores concretos envolvidos na operação
 * @param pivotIndex     posição do pivô, quando houver; caso contrário {@code null}
 * @param moves          movimentações (atribuições de elementos) realizadas desde o passo anterior
 * @param message        explicação em linguagem natural
 */

public record SortStep(
		int step,
		OperationType type,
		int[] values,
		int[] indexes,
		int[] involvedValues,
		Integer pivotIndex,
		int moves,
		String message) {
}
