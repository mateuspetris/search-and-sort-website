package meuprojeto.pesquisaOrdenacao.config;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

/** Origens configuradas como em produção: o domínio do Cloudflare Pages e seus deploys de preview. */
@SpringBootTest(properties = "app.cors.allowed-origins=https://pesquisa-ordenacao.pages.dev,https://*.pesquisa-ordenacao.pages.dev")
@AutoConfigureMockMvc
class CorsOriginPatternTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void allowsProductionOrigin() throws Exception {
		preflight("https://pesquisa-ordenacao.pages.dev")
				.andExpect(status().isOk())
				.andExpect(header().string("Access-Control-Allow-Origin", "https://pesquisa-ordenacao.pages.dev"));
	}

	@Test
	void allowsPreviewDeploymentSubdomain() throws Exception {
		preflight("https://3f2a1b9c.pesquisa-ordenacao.pages.dev")
				.andExpect(status().isOk())
				.andExpect(header().string("Access-Control-Allow-Origin", "https://3f2a1b9c.pesquisa-ordenacao.pages.dev"));
	}

	@Test
	void rejectsOtherPagesProjects() throws Exception {
		preflight("https://outro-projeto.pages.dev")
				.andExpect(status().isForbidden())
				.andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
	}

	private ResultActions preflight(String origin) throws Exception {
		return mockMvc.perform(options("/api/algorithms/bubble-sort/execute")
				.header("Origin", origin)
				.header("Access-Control-Request-Method", "POST"));
	}
}
