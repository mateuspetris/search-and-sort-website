package meuprojeto.pesquisaOrdenacao.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Usa um servidor real porque o MockMvc sempre informa o tamanho do corpo: só assim dá para enviar
 * uma requisição {@code Transfer-Encoding: chunked}, sem {@code Content-Length}.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RequestBodyLimitIntegrationTest {

	private final HttpClient client = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build();

	@Value("${local.server.port}")
	private int port;

	@Value("${app.max-request-size-bytes}")
	private int maxRequestSizeBytes;

	@Test
	void chunkedBodyAboveLimitReturns413() throws Exception {
		String body = "{\"values\": [1]" + " ".repeat(maxRequestSizeBytes * 2) + "}";

		HttpResponse<String> response = sendChunked(body);

		assertThat(response.statusCode()).isEqualTo(413);
		assertThat(response.body()).contains("\"status\":413");
	}

	@Test
	void chunkedBodyWithinLimitIsProcessedNormally() throws Exception {
		HttpResponse<String> response = sendChunked("{\"values\": [3, 1, 2]}");

		assertThat(response.statusCode()).isEqualTo(200);
		assertThat(response.body()).contains("\"finalArray\":[1,2,3]");
	}

	@Test
	void bodyExactlyAtLimitIsAccepted() throws Exception {
		String prefix = "{\"values\": [3, 1, 2]";
		String body = prefix + " ".repeat(maxRequestSizeBytes - prefix.length() - 1) + "}";

		HttpResponse<String> response = sendChunked(body);

		assertThat(body.getBytes(StandardCharsets.UTF_8)).hasSize(maxRequestSizeBytes);
		assertThat(response.statusCode()).isEqualTo(200);
	}

	/** Um corpo vindo de um InputStream não tem tamanho conhecido, então o HttpClient o envia em chunks. */
	private HttpResponse<String> sendChunked(String body) throws Exception {
		byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
		HttpRequest request = HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/algorithms/bubble-sort/execute"))
				.header("Content-Type", "application/json")
				.POST(HttpRequest.BodyPublishers.ofInputStream(() -> new ByteArrayInputStream(bytes)))
				.build();
		return client.send(request, HttpResponse.BodyHandlers.ofString());
	}
}
