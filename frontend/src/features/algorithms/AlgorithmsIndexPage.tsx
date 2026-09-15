import { Section } from '../../components/Section/Section';
import { AlgorithmList } from './components/AlgorithmList';

export function AlgorithmsIndexPage() {
  return (
    <Section
      eyebrow="Algoritmos"
      title="Oito formas de colocar as coisas em ordem"
      lead="Todos seguem a mesma estrutura: ideia, passo a passo, laboratório, código, características e comparação."
    >
      <AlgorithmList />
    </Section>
  );
}
