package meuprojeto.pesquisaOrdenacao.controller;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.matchesPattern;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

/** Testes de endpoint com a pilha real: Controller + Service + Algorithm + GlobalExceptionHandler. */
@SpringBootTest
@AutoConfigureMockMvc
class AlgorithmApiIntegrationTest {

	private static final String TIMESTAMP_PATTERN = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}";

	@Autowired
	private MockMvc mockMvc;

	@Test
	void listsAllEightAlgorithms() throws Exception {
		mockMvc.perform(get("/api/algorithms"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(8)))
				.andExpect(jsonPath("$[*].id", contains("bubble-sort", "selection-sort", "insertion-sort",
						"merge-sort", "quick-sort", "shell-sort", "heap-sort", "cocktail-shaker-sort")));
	}

	@Test
	void returnsAlgorithmInfo() throws Exception {
		mockMvc.perform(get("/api/algorithms/quick-sort"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value("quick-sort"))
				.andExpect(jsonPath("$.name").value("Quick Sort"))
				.andExpect(jsonPath("$.bestCase").value("O(n log n)"))
				.andExpect(jsonPath("$.averageCase").value("O(n log n)"))
				.andExpect(jsonPath("$.worstCase").value("O(n²)"))
				.andExpect(jsonPath("$.spaceComplexity").value("O(log n)"))
				.andExpect(jsonPath("$.stable").value(false))
				.andExpect(jsonPath("$.inPlace").value(true));
	}

	@Test
	void unknownAlgorithmInfoReturns404() throws Exception {
		mockMvc.perform(get("/api/algorithms/unknown-sort"))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.status").value(404))
				.andExpect(jsonPath("$.error").value("Algorithm Not Found"))
				.andExpect(jsonPath("$.message").value("Algorithm 'unknown-sort' was not found."))
				.andExpect(jsonPath("$.path").value("/api/algorithms/unknown-sort"))
				.andExpect(jsonPath("$.timestamp", matchesPattern(TIMESTAMP_PATTERN)));
	}

	@ParameterizedTest
	@ValueSource(strings = {"bubble-sort", "selection-sort", "insertion-sort", "merge-sort", "quick-sort",
			"shell-sort", "heap-sort", "cocktail-shaker-sort"})
	void executesEveryAlgorithm(String algorithmId) throws Exception {
		execute(algorithmId, "{\"values\": [8, 3, 7, 4, 9, 2, 6, 5]}")
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.algorithm").value(algorithmId))
				.andExpect(jsonPath("$.initialArray", contains(8, 3, 7, 4, 9, 2, 6, 5)))
				.andExpect(jsonPath("$.finalArray", contains(2, 3, 4, 5, 6, 7, 8, 9)))
				.andExpect(jsonPath("$.metrics.inputSize").value(8))
				.andExpect(jsonPath("$.metrics.comparisons").isNumber())
				.andExpect(jsonPath("$.metrics.swaps").isNumber())
				.andExpect(jsonPath("$.metrics.executionTimeMs").isNumber())
				.andExpect(jsonPath("$.steps[0].step").value(1))
				.andExpect(jsonPath("$.steps[-1].type").value("COMPLETE"))
				.andExpect(jsonPath("$.steps[-1].values", contains(2, 3, 4, 5, 6, 7, 8, 9)));
	}

	@Test
	void serializesStepContract() throws Exception {
		execute("quick-sort", "{\"values\": [3, 1, 2]}")
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.metrics.totalSteps").value(12))
				.andExpect(jsonPath("$.metrics.comparisons").value(5))
				.andExpect(jsonPath("$.metrics.swaps").value(2))
				.andExpect(jsonPath("$.metrics.moves").value(8))
				.andExpect(jsonPath("$.steps", hasSize(12)))
				.andExpect(jsonPath("$.steps[0].type").value("PIVOT_SELECTED"))
				.andExpect(jsonPath("$.steps[0].values", contains(3, 1, 2)))
				.andExpect(jsonPath("$.steps[0].indexes", contains(1)))
				.andExpect(jsonPath("$.steps[0].involvedValues", contains(1)))
				.andExpect(jsonPath("$.steps[0].pivotIndex").value(1))
				.andExpect(jsonPath("$.steps[0].moves").value(1))
				.andExpect(jsonPath("$.steps[0].message").isString())
				.andExpect(jsonPath("$.steps[4].type").value("SWAP"))
				.andExpect(jsonPath("$.steps[4].moves").value(3))
				.andExpect(jsonPath("$.steps[11].pivotIndex").value(equalTo(null)));
	}

	@Test
	void benchmarkReproducesWirthTableWithDefaultSizes() throws Exception {
		mockMvc.perform(post("/api/benchmarks"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.sizes", contains(256, 2048)))
				.andExpect(jsonPath("$.inputs", contains("ORDERED", "RANDOM", "REVERSED")))
				.andExpect(jsonPath("$.results", hasSize(8 * 2 * 3)))
				.andExpect(jsonPath("$.results[0].algorithm").value("bubble-sort"))
				.andExpect(jsonPath("$.results[0].size").value(256))
				.andExpect(jsonPath("$.results[0].input").value("ORDERED"))
				.andExpect(jsonPath("$.results[0].timeMs").isNumber())
				.andExpect(jsonPath("$.results[0].runs").isNumber())
				.andExpect(jsonPath("$.results[0].comparisons").value(32640))
				.andExpect(jsonPath("$.results[0].moves").value(0));
	}

	@Test
	void benchmarkAcceptsCustomSizes() throws Exception {
		mockMvc.perform(post("/api/benchmarks").contentType(MediaType.APPLICATION_JSON).content("{\"sizes\": [64]}"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.sizes", contains(64)))
				.andExpect(jsonPath("$.results", hasSize(8 * 3)));
	}

	@Test
	void benchmarkRejectsSizeAboveLimit() throws Exception {
		mockMvc.perform(post("/api/benchmarks").contentType(MediaType.APPLICATION_JSON).content("{\"sizes\": [5000]}"))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").value("Invalid Benchmark"))
				.andExpect(jsonPath("$.message").value("Benchmark sizes must be between 1 and 4096 (received 5000)."));
	}

	@Test
	void unknownAlgorithmExecutionReturns404() throws Exception {
		execute("algoritmo-inexistente", "{\"values\": [3, 1, 2]}")
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.error").value("Algorithm Not Found"))
				.andExpect(jsonPath("$.path").value("/api/algorithms/algoritmo-inexistente/execute"));
	}

	@Test
	void emptyArrayReturns400() throws Exception {
		execute("bubble-sort", "{\"values\": []}")
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.status").value(400))
				.andExpect(jsonPath("$.error").value("Invalid Array"))
				.andExpect(jsonPath("$.message").value("The array cannot be empty."))
				.andExpect(jsonPath("$.path").value("/api/algorithms/bubble-sort/execute"));
	}

	@Test
	void missingValuesReturns400() throws Exception {
		execute("bubble-sort", "{}")
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.message").value("The array cannot be null."));
	}

	@Test
	void nullElementReturns400() throws Exception {
		execute("bubble-sort", "{\"values\": [1, null, 2]}")
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.message").value("The array cannot contain null elements."));
	}

	@Test
	void arrayAboveLimitReturns400() throws Exception {
		String values = IntStream.rangeClosed(1, 257).mapToObj(String::valueOf).collect(Collectors.joining(","));

		execute("bubble-sort", "{\"values\": [" + values + "]}")
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.message").value("The array cannot have more than 256 elements (received 257)."));
	}

	@Test
	void arrayAtLimitIsAccepted() throws Exception {
		String values = IntStream.rangeClosed(1, 256).map(i -> 257 - i).mapToObj(String::valueOf)
				.collect(Collectors.joining(","));

		execute("bubble-sort", "{\"values\": [" + values + "]}")
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.metrics.inputSize").value(256));
	}

	@ParameterizedTest
	@ValueSource(strings = {"", "not json", "{\"values\": [1, \"abc\"]}", "{\"values\": [1.5, 2]}",
			"{\"values\": [9999999999]}", "{\"values\": 5}"})
	void malformedBodyReturns400(String body) throws Exception {
		execute("bubble-sort", body)
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").value("Malformed Request"));
	}

	@Test
	void oversizedPayloadReturns413() throws Exception {
		String body = "{\"values\": [1]" + " ".repeat(20_000) + "}";

		execute("bubble-sort", body)
				.andExpect(status().isContentTooLarge())
				.andExpect(jsonPath("$.status").value(413));
	}

	@Test
	void unknownRouteReturns404WithStandardBody() throws Exception {
		mockMvc.perform(get("/api/nothing-here"))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.status").value(404))
				.andExpect(jsonPath("$.path").value("/api/nothing-here"));
	}

	@Test
	void unsupportedMethodReturns405() throws Exception {
		mockMvc.perform(delete("/api/algorithms"))
				.andExpect(status().isMethodNotAllowed())
				.andExpect(jsonPath("$.status").value(405));
	}

	@Test
	void corsAllowsConfiguredFrontendOrigin() throws Exception {
		mockMvc.perform(options("/api/algorithms/bubble-sort/execute")
						.header("Origin", "http://localhost:5173")
						.header("Access-Control-Request-Method", "POST"))
				.andExpect(status().isOk())
				.andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));
	}

	@Test
	void corsRejectsUnknownOrigin() throws Exception {
		mockMvc.perform(options("/api/algorithms/bubble-sort/execute")
						.header("Origin", "http://evil.example")
						.header("Access-Control-Request-Method", "POST"))
				.andExpect(status().isForbidden())
				.andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
	}

	@Test
	void errorResponsesDoNotExposeInternals() throws Exception {
		execute("bubble-sort", "not json")
				.andExpect(jsonPath("$.trace").doesNotExist())
				.andExpect(jsonPath("$.message", not(containsString("Exception"))));
	}

	private ResultActions execute(String algorithmId, String body) throws Exception {
		return mockMvc.perform(post("/api/algorithms/{id}/execute", algorithmId)
				.contentType(MediaType.APPLICATION_JSON)
				.content(body));
	}
}
