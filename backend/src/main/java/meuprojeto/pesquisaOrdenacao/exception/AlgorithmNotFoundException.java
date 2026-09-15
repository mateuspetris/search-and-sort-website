package meuprojeto.pesquisaOrdenacao.exception;

public class AlgorithmNotFoundException extends RuntimeException {

	public AlgorithmNotFoundException(String algorithmId) {
		super("Algorithm '" + algorithmId + "' was not found.");
	}
}
