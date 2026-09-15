package meuprojeto.pesquisaOrdenacao.controller;

import meuprojeto.pesquisaOrdenacao.dto.SortRequest;
import meuprojeto.pesquisaOrdenacao.dto.SortResponse;
import meuprojeto.pesquisaOrdenacao.service.ExecutionService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/algorithms")
public class ExecutionController {

	private final ExecutionService executionService;

	public ExecutionController(ExecutionService executionService) {
		this.executionService = executionService;
	}

	@PostMapping("/{algorithmId}/execute")
	public SortResponse execute(@PathVariable String algorithmId, @RequestBody SortRequest request) {
		return executionService.execute(algorithmId, request);
	}
}
