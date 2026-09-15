import { describe, expect, it } from 'vitest';
import { generateInput, type InputType } from './inputGenerators';

function sequenceRandom(values: number[]) {
  let i = 0;
  return () => values[i++ % values.length]!;
}

describe('generateInput', () => {
  it('gera array já ordenado', () => {
    expect(generateInput('sorted', 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('gera array invertido', () => {
    expect(generateInput('reversed', 5)).toEqual([5, 4, 3, 2, 1]);
  });

  it.each<InputType>(['random', 'sorted', 'reversed', 'nearly-sorted'])('%s contém exatamente os valores 1..n', (type) => {
    const values = generateInput(type, 40);

    expect(values).toHaveLength(40);
    expect([...values].sort((a, b) => a - b)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
  });

  it('embaralha de forma determinística com a fonte aleatória informada', () => {
    const random = sequenceRandom([0.1, 0.7, 0.3, 0.9]);

    expect(generateInput('random', 5, random)).toEqual(generateInput('random', 5, sequenceRandom([0.1, 0.7, 0.3, 0.9])));
  });

  it('quase ordenado difere do ordenado em poucas posições', () => {
    const values = generateInput('nearly-sorted', 50, sequenceRandom([0.2, 0.5, 0.8, 0.1, 0.6]));
    const displaced = values.filter((value, index) => value !== index + 1).length;

    expect(displaced).toBeGreaterThan(0);
    expect(displaced).toBeLessThanOrEqual(10);
  });

  it('funciona com tamanhos mínimos', () => {
    expect(generateInput('nearly-sorted', 1)).toEqual([1]);
    expect(generateInput('random', 0)).toEqual([]);
  });
});
