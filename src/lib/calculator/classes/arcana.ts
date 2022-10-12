import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const Empress: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 20, 2: 25, 3: 30 };
  return {
    ...profile,
    bonusDamage:
      profile.bonusDamage *
      rateToMultiplier(damage[level]) *
      rateToMultiplier(profile.stats.spec / 20)
  };
};

// TODO: encode emperor card
export const Empreror: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 10, 2: 20, 3: 30 };
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
  };
};
