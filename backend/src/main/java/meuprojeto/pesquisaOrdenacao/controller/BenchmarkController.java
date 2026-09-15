package meuprojeto.pesquisaOrdenacao.controller;

import meuprojeto.pesquisaOrdenacao.dto.BenchmarkRequest;
import meuprojeto.pesquisaOrdenacao.dto.BenchmarkResponse;
import meuprojeto.pesquisaOrdenacao.service.BenchmarkService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/benchmarks")
public class BenchmarkController {

	private final BenchmarkService benchmarkService;

	public BenchmarkController(BenchmarkService benchmarkService) {
		this.benchmarkService = benchmarkService;
	}

	@PostMapping
	public BenchmarkResponse run(@RequestBody(required = false) BenchmarkRequest request) {
		return benchmarkService.run(request);
	}
}
