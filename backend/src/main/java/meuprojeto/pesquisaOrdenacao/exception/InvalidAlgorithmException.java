package meuprojeto.pesquisaOrdenacao.exception;

/** Parâmetro de configuração de algoritmo inválido. Ainda não há parâmetros no MVP. */
public class InvalidAlgorithmException extends RuntimeException {

	public InvalidAlgorithmException(String message) {
		super(message);
	}
}
