package meuprojeto.pesquisaOrdenacao.controller;

import java.util.List;

import meuprojeto.pesquisaOrdenacao.dto.AlgorithmInfo;
import meuprojeto.pesquisaOrdenacao.service.AlgorithmService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {

	private final AlgorithmService algorithmService;

	public AlgorithmController(AlgorithmService algorithmService) {
		this.algorithmService = algorithmService;
	}

	@GetMapping
	public List<AlgorithmInfo> findAll() {
		return algorithmService.findAll();
	}

	@GetMapping("/{algorithmId}")
	public AlgorithmInfo findById(@PathVariable String algorithmId) {
		return algorithmService.findInfo(algorithmId);
	}
}
