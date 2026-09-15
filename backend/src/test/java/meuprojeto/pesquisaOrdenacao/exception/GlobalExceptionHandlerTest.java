package meuprojeto.pesquisaOrdenacao.exception;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import meuprojeto.pesquisaOrdenacao.controller.ExecutionController;
import meuprojeto.pesquisaOrdenacao.service.ExecutionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

/** Cenários que o fluxo real não produz hoje: exceção de parâmetro de algoritmo e bug inesperado. */
@WebMvcTest(ExecutionController.class)
class GlobalExceptionHandlerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ExecutionService executionService;

	@Test
	void invalidAlgorithmExceptionReturns400() throws Exception {
		when(executionService.execute(anyString(), any()))
				.thenThrow(new InvalidAlgorithmException("Parameter 'gap' must be positive."));

		execute()
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.status").value(400))
				.andExpect(jsonPath("$.error").value("Invalid Algorithm"))
				.andExpect(jsonPath("$.message").value("Parameter 'gap' must be positive."))
				.andExpect(jsonPath("$.path").value("/api/algorithms/bubble-sort/execute"));
	}

	@Test
	void unexpectedExceptionReturns500WithoutInternalDetails() throws Exception {
		when(executionService.execute(anyString(), any()))
				.thenThrow(new IllegalStateException("secret internal detail"));

		execute()
				.andExpect(status().isInternalServerError())
				.andExpect(jsonPath("$.status").value(500))
				.andExpect(jsonPath("$.error").value("Internal Server Error"))
				.andExpect(jsonPath("$.message").value("An unexpected error occurred."))
				.andExpect(content().string(not(containsString("secret"))))
				.andExpect(content().string(not(containsString("IllegalStateException"))));
	}

	@Test
	void nullPointerIsNotMaskedAsValidationError() throws Exception {
		when(executionService.execute(anyString(), any())).thenThrow(new NullPointerException());

		execute().andExpect(status().isInternalServerError());
	}

	private ResultActions execute() throws Exception {
		return mockMvc.perform(post("/api/algorithms/bubble-sort/execute")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"values\": [3, 1, 2]}"));
	}
}
