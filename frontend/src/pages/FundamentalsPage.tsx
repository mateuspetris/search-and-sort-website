import { ButtonLink } from '../components/Button/Button';
import { Section } from '../components/Section/Section';
import { CONCEPTS } from '../features/algorithms/concepts';
import styles from './FundamentalsPage.module.css';

const GROWTH = [
  { label: 'O(log n)', value: 7 },
  { label: 'O(n)', value: 100 },
  { label: 'O(n log n)', value: 664 },
  { label: 'O(n²)', value: 10_000 },
];

const TOPICS = [
  {
    id: 'ordenacao',
    title: 'O que é um algoritmo de ordenação?',
    body: [
      'É um procedimento que reorganiza uma coleção de elementos segundo uma ordem por exemplo, números do menor para o maior.',
      'Ordenar raramente é o objetivo final: dados ordenados permitem buscar mais rápido, remover duplicados, encontrar medianas e combinar listas.',
    ],
  },
  {
    id: 'pesquisa',
    title: 'O que é pesquisa?',
    body: [
      'Pesquisar é encontrar um elemento em uma coleção. A busca linear olha um elemento por vez; a busca binária descarta metade dos elementos a cada passo, mas exige dados ordenados.',
      'É aqui que ordenação e pesquisa se encontram: ordenar uma vez pode tornar muitas buscas baratas.',
    ],
  },
  {
    id: 'tempo',
    title: 'Complexidade de tempo',
    body: [
      'Mede quantas operações (comparações, trocas, escritas) o algoritmo executa em função do tamanho da entrada, n.',
      'Contar operações, e não segundos, torna a análise independente do computador. Por isso o laboratório mostra comparações e trocas em destaque.',
    ],
  },
  {
    id: 'espaco',
    title: 'Complexidade de espaço',
    body: [
      'Mede a memória extra que o algoritmo precisa além da entrada. O(1) significa uma quantidade fixa, como algumas variáveis; O(n) significa um array auxiliar do tamanho da entrada, como no Merge Sort.',
    ],
  },
  {
    id: 'casos',
    title: 'Melhor caso, caso médio e pior caso',
    body: [
      `Melhor caso: ${CONCEPTS.bestCase} Caso médio: ${CONCEPTS.averageCase} Pior caso: ${CONCEPTS.worstCase}`,
      'O Insertion Sort, por exemplo, é O(n) com dados já ordenados e O(n²) com dados invertidos. Em cada página de algoritmo há um botão para testar esses dois casos.',
    ],
  },
  {
    id: 'estavel',
    title: 'Algoritmo estável',
    body: [
      `${CONCEPTS.stable} Isso importa ao ordenar registros por mais de um critério: ordenar alunos por nome e depois, de forma estável, por nota mantém os nomes em ordem dentro de cada nota.`,
    ],
  },
  {
    id: 'in-place',
    title: 'Algoritmo in-place',
    body: [
      `${CONCEPTS.inPlace} Bubble, Insertion, Quick e Heap Sort são in-place; o Merge Sort não, pois usa um array auxiliar.`,
    ],
  },
  {
    id: 'eficiencia',
    title: 'Eficiência ou simplicidade?',
    body: [
      'Algoritmos O(n²) são curtos, fáceis de entender e podem ser os mais rápidos em entradas pequenas. Algoritmos O(n log n) exigem mais código, mas escalam muito melhor.',
      'Na prática, bibliotecas combinam os dois: usam um algoritmo eficiente e, nos pedaços pequenos, trocam para o Insertion Sort.',
    ],
  },
];

export function FundamentalsPage() {
  return (
    <>
      <Section
        eyebrow="Fundamentos"
        title="O essencial antes dos algoritmos"
        lead="Conceitos curtos que aparecem em todas as páginas. Leia uma vez e volte quando precisar."
      >
        <nav aria-label="Tópicos" className={styles.toc}>
          {TOPICS.map((topic) => (
            <a key={topic.id} href={`#${topic.id}`}>
              {topic.title}
            </a>
          ))}
        </nav>
      </Section>

      <Section muted eyebrow="Notação Big O" title="Como o custo cresce">
        <p className={styles.bigOLead}>
          {CONCEPTS.bigO} Para uma entrada com <strong>n = 100</strong> elementos, a quantidade aproximada de operações é:
        </p>
        <figure className={styles.growth}>
          {GROWTH.map((item) => (
            <div key={item.label} className={styles.growthRow}>
              <code className={styles.growthLabel}>{item.label}</code>
              <span className={styles.growthTrack}>
                <span
                  className={styles.growthFill}
                  style={{ width: `${Math.max(0.6, (item.value / GROWTH.at(-1)!.value) * 100)}%` }}
                />
              </span>
              <span className={styles.growthValue}>{item.value.toLocaleString('pt-BR')}</span>
            </div>
          ))}
          <figcaption className={styles.growthCaption}>
            Com n = 100, um algoritmo O(n²) faz cerca de 15 vezes mais operações que um O(n log n).
          </figcaption>
        </figure>
      </Section>

      {TOPICS.map((topic) => (
        <Section key={topic.id} id={topic.id} title={topic.title}>
          <div className={styles.prose}>
            {topic.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ))}

      <Section title="Pronto para ver na prática?">
        <ButtonLink to="/algoritmos">Explorar algoritmos</ButtonLink>
      </Section>
    </>
  );
}
