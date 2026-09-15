package meuprojeto.pesquisaOrdenacao.exception;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import jakarta.servlet.http.HttpServletRequest;
import meuprojeto.pesquisaOrdenacao.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(AlgorithmNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleAlgorithmNotFound(AlgorithmNotFoundException ex,
			HttpServletRequest request) {
		return build(HttpStatus.NOT_FOUND, "Algorithm Not Found", ex.getMessage(), request);
	}

	@ExceptionHandler(InvalidArrayException.class)
	public ResponseEntity<ErrorResponse> handleInvalidArray(InvalidArrayException ex, HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Invalid Array", ex.getMessage(), request);
	}

	@ExceptionHandler(InvalidAlgorithmException.class)
	public ResponseEntity<ErrorResponse> handleInvalidAlgorithm(InvalidAlgorithmException ex,
			HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Invalid Algorithm", ex.getMessage(), request);
	}

	@ExceptionHandler(InvalidBenchmarkException.class)
	public ResponseEntity<ErrorResponse> handleInvalidBenchmark(InvalidBenchmarkException ex,
			HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Invalid Benchmark", ex.getMessage(), request);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> handleUnreadableBody(HttpMessageNotReadableException ex,
			HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Malformed Request",
				"The request body is missing or is not valid JSON with an integer array.", request);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
		// Erros de protocolo do próprio Spring MVC (404 de rota, 405, 413, 415...) já carregam o status correto.
		if (ex instanceof org.springframework.web.ErrorResponse springError) {
			HttpStatusCode status = springError.getStatusCode();
			return build(status, reasonPhrase(status), springError.getBody().getDetail(), request);
		}
		log.error("Unexpected error on {} {}", request.getMethod(), request.getRequestURI(), ex);
		return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "An unexpected error occurred.",
				request);
	}

	private ResponseEntity<ErrorResponse> build(HttpStatusCode status, String error, String message,
			HttpServletRequest request) {
		ErrorResponse body = new ErrorResponse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS), status.value(),
				error, message, request.getRequestURI());
		return ResponseEntity.status(status).body(body);
	}

	private String reasonPhrase(HttpStatusCode status) {
		HttpStatus known = HttpStatus.resolve(status.value());
		return known != null ? known.getReasonPhrase() : "Error";
	}
}
