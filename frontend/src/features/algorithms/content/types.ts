import type { AlgorithmId } from '../../../api/types';
import type { InputType } from '../../lab/inputGenerators';

export interface ExampleFrame {
  values: number[];
  /** Posições destacadas neste quadro. */
  highlight?: number[];
  /** Posições depois das quais o array é visualmente separado (divisões). */
  splits?: number[];
  /** Posição do pivô, quando houver. */
  pivot?: number;
  note: string;
}

/** Custo do caso na notação do material de estudo. */
export interface CaseCost {
  /** C(n): comparações de chaves. */
  comparisons: string;
  /** M(n): movimentações de itens, quando o material informa. */
  movements?: string;
}

export interface CaseExample {
  /** Tipo de entrada que reproduz o caso no laboratório; `null` quando não há um gerador equivalente. */
  input: InputType | null;
  title: string;
  explanation: string;
  cost?: CaseCost;
}

/**
 * Conteúdo editorial de um algoritmo. Metadados de complexidade vêm da API
 * (GET /api/algorithms/{id}); aqui ficam apenas os textos didáticos.
 */
export interface AlgorithmContent {
  id: AlgorithmId;
  name: string;
  tagline: string;
  /** Complexidade que resume o algoritmo nas listagens. */
  headlineComplexity: string;
  simplicity: 'Alta' | 'Média' | 'Baixa';
  intro: string[];
  howItWorks: string[];
  example: ExampleFrame[];
  code: string;
  codeNotes: { title: string; text: string }[];
  bestCase: CaseExample;
  worstCase: CaseExample;
  whenToUse: string[];
  whenToAvoid: string[];
  comparisons: { with: AlgorithmId; text: string }[];
}
