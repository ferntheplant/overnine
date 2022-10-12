import type { Stats, Rate, Multiplier } from './stats';

export type OptionalKeys<T> = { [Key in keyof T]?: T[Key] };

// TODO: track awakening damage multiplier
export type Profile = {
  stats: Stats;
  critRate: Rate;
  critDamage: Rate;
  attackPower: Rate;
  attackSpeed: Rate;
  moveSpeed: Rate;
  cooldownReduction: Rate;
  bonusDamage: Multiplier;
};

export type Level = 0 | 1 | 2 | 3;
export type Modifier = (profile: Profile, level?: Level) => Profile;

export function applyCritRate(original: Rate, incoming: Rate): Rate {
  return original + incoming;
}
