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
      'Ordenar é rearranjar um conjunto de objetos em ordem crescente ou decrescente, com o objetivo de facilitar a recuperação posterior dos dados armazenados. A ordenação é uma operação fundamental em Ciência da Computação, pois muitos programas a usam como etapa intermediária.',
      'Os algoritmos trabalham sobre os registros de um arquivo por meio de uma chave: um campo especial do registro que controla a ordenação. O registro pode ter outros campos, que independem da chave. A chave pode ser de qualquer tipo que se possa ordenar de forma bem definida; a ordem mais comum é numérica ou alfabética.',
      'A escolha do melhor algoritmo depende do número de itens a ordenar, de quantos já estão ordenados de algum modo, de possíveis restrições aos valores dos itens e do dispositivo de armazenamento utilizado.',
    ],
  },
  {
    id: 'interna-externa',
    title: 'Ordenação interna e externa',
    body: [
      'Ordenação interna: o arquivo cabe completamente na memória principal e pode ser guardado em uma estrutura como um array. Qualquer registro pode ser acessado imediatamente. É o caso de todos os algoritmos deste site.',
      'Ordenação externa: o arquivo não cabe na memória principal e fica em um dispositivo externo, como disco ou fita. Como esse acesso é mais demorado, os registros costumam ser lidos em sequência ou em grandes blocos.',
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
      'Medir o tempo de um programa com um cronômetro nem sempre é uma boa comparação: o tempo depende do computador, do compilador, do sistema operacional e da quantidade e da organização dos dados de entrada. Por isso se estima como o número de operações cresce à medida que aumenta a quantidade de dados, n.',
      `Na ordenação, as duas operações que mais pesam são as comparações de chaves e as movimentações de itens. ${CONCEPTS.comparisons} ${CONCEPTS.movements} O laboratório mostra essas contagens em destaque.`,
    ],
  },
  {
    id: 'espaco',
    title: 'Complexidade de espaço',
    body: [
      'Mede a memória extra que o algoritmo precisa além da entrada. O(1) significa uma quantidade fixa, como algumas variáveis; O(n) significa um array auxiliar do tamanho da entrada, como no Merge Sort.',
      'A memória principal é um recurso que deve ser usado de maneira econômica. Por isso a escolha de um algoritmo não deve considerar só a velocidade: importam também o meio de armazenamento, o tamanho do arquivo e seu potencial de crescimento, a frequência de acesso e de alteração dos registros e a memória auxiliar usada.',
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
      `${CONCEPTS.stable} Por exemplo, uma lista de funcionários em ordem crescente de matrícula é ordenada pelo nome. Se o método for estável, funcionários com o mesmo nome continuam ordenados por matrícula.`,
      'Alguns métodos mais eficientes, como o Quick e o Heap Sort, não são estáveis. Quando a estabilidade é importante, ela pode ser forçada em um método não estável.',
    ],
  },
  {
    id: 'in-place',
    title: 'Algoritmo in-place',
    body: [
      `${CONCEPTS.inPlace} Os métodos preferidos usam um vetor como estrutura de dados e permutam os itens no próprio vetor, como Bubble, Insertion, Quick e Heap Sort. Os que precisam de memória para outra cópia dos itens, como o Merge Sort, são menos econômicos.`,
    ],
  },
  {
    id: 'eficiencia',
    title: 'Eficiência ou simplicidade?',
    body: [
      'Um algoritmo é eficaz quando produz a resposta esperada; é eficiente quando faz isso usando bem os recursos do computador. Dois algoritmos podem resolver o mesmo problema com desempenhos bem diferentes.',
      'Métodos simples, O(n²) comparações, servem para arquivos pequenos: produzem programas pequenos e fáceis de entender, e em muitos casos é melhor usá-los do que um método sofisticado. Métodos eficientes, O(n log n) comparações, servem para arquivos grandes, mas são mais complexos nos detalhes.',
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
        <div className={`${styles.prose} ${styles.bigONotes}`}>
          <p>
            A notação não informa o tempo exato de execução: ela estima como o algoritmo se comporta quando a quantidade
            de dados aumenta, o que permite comparar algoritmos independentemente do computador. As ordens mais comuns
            são <code>O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2ⁿ)</code>.
          </p>
          <p>
            <strong>O(n log n)</strong> é muito comum nos algoritmos eficientes de ordenação, que quebram o problema em
            partes menores, resolvem cada uma e juntam as soluções. <strong>O(n²)</strong> aparece quando os itens são
            processados aos pares, com um laço dentro de outro, e é útil para problemas relativamente pequenos.
          </p>
        </div>
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
