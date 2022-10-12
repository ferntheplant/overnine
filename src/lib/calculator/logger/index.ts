import _ from 'lodash';
import type { Modifier, Profile } from '../types';

function computeProfileDelta(first: Profile, second: Profile) {
  return _.reduce(
    first,
    (acc, value, key) => {
      if (key !== 'stats' && key !== 'bonusDamage') {
        const otherValue = second[key as keyof Profile] as number;
        if (value !== otherValue) {
          acc[key] = otherValue - (value as number);
        }
      }
      if (key === 'bonusDamage') {
        const otherValue = second[key as keyof Profile] as number;
        if (value !== otherValue) {
          acc[key] = otherValue / (value as number);
        }
      }
      return acc;
    },
    {} as any
  );
}

function printDelta(delta: any) {
  const deltas = _.reduce(
    delta,
    (acc, value, key) => {
      if (key !== 'bonusDamage') {
        acc.push(`${key} ${value >= 0 ? '+' : ''}${value.toFixed(2)}%`);
      } else {
        acc.push(`${key} x${value.toFixed(3)}`);
      }
      return acc;
    },
    [] as string[]
  );
  return '\n- ' + deltas.join('\n- ');
}

export function logModifier(modifier: Modifier, ...args: Parameters<Modifier>): [Profile, string] {
  const newProfile = modifier(...args);
  const delta = computeProfileDelta(args[0], newProfile);
  const logString = _.isEmpty(delta)
    ? ''
    : `Applied ${modifier.name}${args[1] ? ` at level ${args[1]}` : ''}: ${printDelta(delta)}`;
  return [newProfile, logString];
}
