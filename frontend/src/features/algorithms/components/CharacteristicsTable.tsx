import type { AlgorithmInfo } from '../../../api/types';
import { Badge } from '../../../components/Badge/Badge';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { CONCEPTS } from '../concepts';
import styles from './CharacteristicsTable.module.css';

interface CharacteristicsTableProps {
  info: AlgorithmInfo;
  simplicity: string;
}

export function CharacteristicsTable({ info, simplicity }: CharacteristicsTableProps) {
  const rows = [
    { label: <Tooltip content={CONCEPTS.bestCase}>Melhor caso</Tooltip>, value: <code>{info.bestCase}</code> },
    { label: <Tooltip content={CONCEPTS.averageCase}>Caso médio</Tooltip>, value: <code>{info.averageCase}</code> },
    { label: <Tooltip content={CONCEPTS.worstCase}>Pior caso</Tooltip>, value: <code>{info.worstCase}</code> },
    { label: <Tooltip content={CONCEPTS.space}>Memória extra</Tooltip>, value: <code>{info.spaceComplexity}</code> },
    {
      label: <Tooltip content={CONCEPTS.stable}>Estável</Tooltip>,
      value: <Badge tone={info.stable ? 'green' : 'neutral'}>{info.stable ? 'Sim' : 'Não'}</Badge>,
    },
    {
      label: <Tooltip content={CONCEPTS.inPlace}>In-place</Tooltip>,
      value: <Badge tone={info.inPlace ? 'green' : 'neutral'}>{info.inPlace ? 'Sim' : 'Não'}</Badge>,
    },
    { label: 'Simplicidade', value: <Badge tone="yellow">{simplicity}</Badge> },
  ];

  return (
    <table className={styles.table}>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row">{row.label}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
