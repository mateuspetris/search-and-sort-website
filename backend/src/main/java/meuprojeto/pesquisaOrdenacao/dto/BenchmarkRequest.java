package meuprojeto.pesquisaOrdenacao.dto;

import java.util.List;

/** @param sizes tamanhos de entrada (N); quando ausente, usa os mesmos do quadro de Wirth: 256 e 2048 */
public record BenchmarkRequest(List<Integer> sizes) {
}
