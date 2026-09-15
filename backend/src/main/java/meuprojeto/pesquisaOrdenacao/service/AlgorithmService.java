package meuprojeto.pesquisaOrdenacao.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import meuprojeto.pesquisaOrdenacao.algorithm.SortAlgorithm;
import meuprojeto.pesquisaOrdenacao.dto.AlgorithmInfo;
import meuprojeto.pesquisaOrdenacao.exception.AlgorithmNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AlgorithmService {

	private final Map<String, SortAlgorithm> algorithmsById = new LinkedHashMap<>();

	public AlgorithmService(List<SortAlgorithm> algorithms) {
		for (SortAlgorithm algorithm : algorithms) {
			if (algorithmsById.putIfAbsent(algorithm.getId(), algorithm) != null) {
				throw new IllegalStateException("Duplicate algorithm id: " + algorithm.getId());
			}
		}
	}

	public List<AlgorithmInfo> findAll() {
		return algorithmsById.values().stream().map(AlgorithmInfo::from).toList();
	}

	public AlgorithmInfo findInfo(String algorithmId) {
		return AlgorithmInfo.from(getAlgorithm(algorithmId));
	}

	public SortAlgorithm getAlgorithm(String algorithmId) {
		SortAlgorithm algorithm = algorithmsById.get(algorithmId);
		if (algorithm == null) {
			throw new AlgorithmNotFoundException(algorithmId);
		}
		return algorithm;
	}
}
