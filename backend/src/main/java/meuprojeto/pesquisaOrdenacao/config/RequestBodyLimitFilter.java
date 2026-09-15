package meuprojeto.pesquisaOrdenacao.config;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Limita o corpo das requisições em {@code /api/**} pelos bytes realmente recebidos, e não só pelo
 * cabeçalho {@code Content-Length}, que não existe em requisições {@code Transfer-Encoding: chunked}.
 * <p>
 * O corpo é lido aqui (no máximo {@code limite + 1} bytes) e entregue ao restante da aplicação a partir
 * da memória. Quando passa do limite, a requisição é apenas marcada: quem lança o 413 é o interceptor do
 * {@link WebConfig}, que roda dentro do DispatcherServlet e por isso passa pelo GlobalExceptionHandler.
 */
@Component
public class RequestBodyLimitFilter extends OncePerRequestFilter {

	static final String BODY_TOO_LARGE = RequestBodyLimitFilter.class.getName() + ".BODY_TOO_LARGE";

	private final long maxRequestSizeBytes;

	public RequestBodyLimitFilter(@Value("${app.max-request-size-bytes}") long maxRequestSizeBytes) {
		this.maxRequestSizeBytes = maxRequestSizeBytes;
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		return !request.getRequestURI().startsWith(request.getContextPath() + "/api/");
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		if (request.getContentLengthLong() > maxRequestSizeBytes) {
			request.setAttribute(BODY_TOO_LARGE, true);
			chain.doFilter(request, response);
			return;
		}

		byte[] body = request.getInputStream().readNBytes(Math.toIntExact(maxRequestSizeBytes + 1));
		if (body.length > maxRequestSizeBytes) {
			request.setAttribute(BODY_TOO_LARGE, true);
		}
		chain.doFilter(new CachedBodyRequest(request, body), response);
	}

	/** Requisição cujo corpo já foi lido e fica disponível a partir da memória. */
	private static final class CachedBodyRequest extends HttpServletRequestWrapper {

		private final byte[] body;

		CachedBodyRequest(HttpServletRequest request, byte[] body) {
			super(request);
			this.body = body;
		}

		@Override
		public ServletInputStream getInputStream() {
			ByteArrayInputStream source = new ByteArrayInputStream(body);
			return new ServletInputStream() {
				@Override
				public int read() {
					return source.read();
				}

				@Override
				public int read(byte[] buffer, int offset, int length) {
					return source.read(buffer, offset, length);
				}

				@Override
				public boolean isFinished() {
					return source.available() == 0;
				}

				@Override
				public boolean isReady() {
					return true;
				}

				@Override
				public void setReadListener(ReadListener listener) {
					throw new UnsupportedOperationException("Leitura assíncrona não é suportada.");
				}
			};
		}

		@Override
		public BufferedReader getReader() {
			String encoding = getCharacterEncoding();
			Charset charset = encoding != null ? Charset.forName(encoding) : StandardCharsets.UTF_8;
			return new BufferedReader(new InputStreamReader(getInputStream(), charset));
		}

		@Override
		public int getContentLength() {
			return body.length;
		}

		@Override
		public long getContentLengthLong() {
			return body.length;
		}
	}
}
