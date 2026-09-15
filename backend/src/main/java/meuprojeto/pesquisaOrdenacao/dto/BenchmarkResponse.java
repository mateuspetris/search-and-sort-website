package meuprojeto.pesquisaOrdenacao.dto;

import java.util.List;

import meuprojeto.pesquisaOrdenacao.algorithm.BenchmarkInput;

public record BenchmarkResponse(List<Integer> sizes, List<BenchmarkInput> inputs, List<BenchmarkResult> results) {
}
