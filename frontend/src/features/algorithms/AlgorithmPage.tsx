import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { getAlgorithm } from '../../api/algorithms';
import type { AlgorithmId } from '../../api/types';
import { Badge } from '../../components/Badge/Badge';
import { Button, ButtonLink } from '../../components/Button/Button';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';
import { Section } from '../../components/Section/Section';
import { ErrorMessage, LoadingMessage } from '../../components/StatusMessage/StatusMessage';
import { useAsync } from '../../hooks/useAsync';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { AlgorithmLab, type LabPreset } from '../lab/AlgorithmLab';
import { INPUT_TYPES } from '../lab/inputGenerators';
import { AlgorithmIllustration } from './components/AlgorithmIllustration';
import { CharacteristicsTable } from './components/CharacteristicsTable';
import { ExampleStrip } from './components/ExampleStrip';
import { getAlgorithmContent, isAlgorithmId, type AlgorithmContent, type CaseExample } from './content';
import styles from './AlgorithmPage.module.css';

export function AlgorithmPage() {
  const { algorithmId } = useParams();
  if (!isAlgorithmId(algorithmId)) {
    return <NotFoundPage />;
  }
  // key recria a página ao navegar entre algoritmos, zerando laboratório e presets.
  return <AlgorithmPageContent key={algorithmId} id={algorithmId} />;
}

function AlgorithmPageContent({ id }: { id: AlgorithmId }) {
  const content = getAlgorithmContent(id);
  const [preset, setPreset] = useState<LabPreset>();

  function tryInLab(example: CaseExample) {
    if (!example.input) {
      return;
    }
    setPreset({ inputType: example.input, requestId: Date.now() });
    document.getElementById('laboratorio')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <article>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.breadcrumb}>
            <Link to="/algoritmos">Algoritmos</Link> / {content.name}
          </p>
          <h1 className={styles.title}>{content.name}</h1>
          <p className={styles.tagline}>{content.tagline}</p>
          <div className={styles.heroMeta}>
            <Badge tone="green">{content.headlineComplexity}</Badge>
            <Badge tone="yellow">Simplicidade {content.simplicity.toLowerCase()}</Badge>
          </div>
        </div>
        <div className={styles.heroArt}>
          <AlgorithmIllustration id={id} size="lg" />
        </div>
      </header>

      <Section id="introducao" eyebrow="01 · Introdução" title="O que é?">
        <div className={styles.prose}>
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="como-funciona" eyebrow="02 · Como funciona" title="Passo a passo">
        <ol className={styles.steps}>
          {content.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3 className={styles.subheading}>Exemplo visual</h3>
        <ExampleStrip frames={content.example} />
      </Section>

      <Section
        id="laboratorio"
        muted
        eyebrow="03 · Visualização"
        title="Laboratório"
        lead="Escolha a entrada e acompanhe cada comparação e troca executada pelo backend."
      >
        <AlgorithmLab algorithmId={id} preset={preset} />
      </Section>

      <Section id="codigo" eyebrow="04 · Código" title="Implementação em Java">
        <div className={styles.codeLayout}>
          <CodeBlock code={content.code} title={`${content.name}.java`} />
          <dl className={styles.codeNotes}>
            {content.codeNotes.map((note) => (
              <div key={note.title}>
                <dt>{note.title}</dt>
                <dd>{note.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="caracteristicas" eyebrow="05 · Características" title="Complexidade e propriedades">
        <Characteristics id={id} simplicity={content.simplicity} />
      </Section>

      <Section id="casos" eyebrow="06 · Melhor e pior caso" title="Quando ele brilha e quando sofre">
        <div className={styles.cases}>
          <CaseCard label="Melhor caso" example={content.bestCase} onTry={tryInLab} />
          <CaseCard label="Pior caso" example={content.worstCase} onTry={tryInLab} />
        </div>
        <div className={styles.usage}>
          <UsageList title="Quando usar" items={content.whenToUse} />
          <UsageList title="Quando evitar" items={content.whenToAvoid} />
        </div>
      </Section>

      <Section id="comparacao" eyebrow="07 · Comparação" title="Em relação aos outros">
        <Comparisons content={content} />
      </Section>
    </article>
  );
}

function Characteristics({ id, simplicity }: { id: AlgorithmId; simplicity: string }) {
  const info = useAsync(() => getAlgorithm(id), [id]);
  if (info.status === 'loading') {
    return <LoadingMessage />;
  }
  if (info.status === 'error') {
    return <ErrorMessage error={info.error} onRetry={info.reload} />;
  }
  return <CharacteristicsTable info={info.data} simplicity={simplicity} />;
}

function CaseCard({ label, example, onTry }: { label: string; example: CaseExample; onTry: (e: CaseExample) => void }) {
  const inputLabel = INPUT_TYPES.find((type) => type.value === example.input)?.label;
  return (
    <div className={styles.case}>
      <p className={styles.caseLabel}>{label}</p>
      <h3 className={styles.caseTitle}>{example.title}</h3>
      <p className={styles.caseText}>{example.explanation}</p>
      {inputLabel && (
        <Button variant="secondary" size="sm" onClick={() => onTry(example)}>
          Testar com entrada {inputLabel.toLowerCase()}
        </Button>
      )}
    </div>
  );
}

function UsageList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className={styles.subheading}>{title}</h3>
      <ul className={styles.bullets}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Comparisons({ content }: { content: AlgorithmContent }) {
  return (
    <>
      <ul className={styles.comparisons}>
        {content.comparisons.map((comparison) => {
          const other = getAlgorithmContent(comparison.with);
          return (
            <li key={comparison.with}>
              <Link to={`/algoritmos/${other.id}`} className={styles.comparisonName}>
                {other.name}
              </Link>
              <p>{comparison.text}</p>
              <Link to={`/comparar?algoritmos=${content.id},${other.id}`} className={styles.compareLink}>
                Comparar lado a lado →
              </Link>
            </li>
          );
        })}
      </ul>
      <ButtonLink to={`/comparar?algoritmos=${content.id}`} variant="primary">
        Abrir no comparador
      </ButtonLink>
    </>
  );
}
