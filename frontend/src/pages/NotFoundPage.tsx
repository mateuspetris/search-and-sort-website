import { ButtonLink } from '../components/Button/Button';
import { Section } from '../components/Section/Section';

export function NotFoundPage() {
  return (
    <Section eyebrow="404" title="Página não encontrada" lead="O endereço não existe ou o algoritmo ainda não faz parte do laboratório.">
      <ButtonLink to="/algoritmos">Ver algoritmos disponíveis</ButtonLink>
    </Section>
  );
}
