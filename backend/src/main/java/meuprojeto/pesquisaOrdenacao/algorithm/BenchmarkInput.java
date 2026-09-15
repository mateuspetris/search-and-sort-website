package meuprojeto.pesquisaOrdenacao.algorithm;

import java.util.Random;
import java.util.stream.IntStream;
public enum BenchmarkInput {

	ORDERED {
		@Override
		public int[] generate(int size, long seed) {
			return IntStream.rangeClosed(1, size).toArray();
		}
	},

	RANDOM {
		@Override
		public int[] generate(int size, long seed) {
			int[] values = ORDERED.generate(size, seed);
			Random random = new Random(seed);
			for (int i = values.length - 1; i > 0; i--) {
				int j = random.nextInt(i + 1);
				int temp = values[i];
				values[i] = values[j];
				values[j] = temp;
			}
			return values;
		}
	},

	REVERSED {
		@Override
		public int[] generate(int size, long seed) {
			return IntStream.rangeClosed(1, size).map(i -> size + 1 - i).toArray();
		}
	};
	public abstract int[] generate(int size, long seed);
}
