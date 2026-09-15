package meuprojeto.pesquisaOrdenacao.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.ContentTooLargeException;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	private final String[] allowedOrigins;
	private final long maxRequestSizeBytes;

	public WebConfig(@Value("${app.cors.allowed-origins}") String[] allowedOrigins,
			@Value("${app.max-request-size-bytes}") long maxRequestSizeBytes) {
		this.allowedOrigins = allowedOrigins;
		this.maxRequestSizeBytes = maxRequestSizeBytes;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
				.allowedOriginPatterns(allowedOrigins)
				.allowedMethods("GET", "POST");
	}

	/**
	 * Responde 413 aos corpos grandes demais. O tamanho real, inclusive de requisições chunked, é medido pelo
	 * {@link RequestBodyLimitFilter}; o Content-Length declarado continua sendo verificado aqui também.
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new HandlerInterceptor() {
			@Override
			public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
				if (request.getAttribute(RequestBodyLimitFilter.BODY_TOO_LARGE) != null
						|| request.getContentLengthLong() > maxRequestSizeBytes) {
					throw new ContentTooLargeException(null);
				}
				return true;
			}
		}).addPathPatterns("/api/**");
	}
}
