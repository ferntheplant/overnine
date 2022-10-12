import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const Pistoleer: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 30, 2: 50, 3: 70 };
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
    critDamage: profile.critDamage + profile.stats.spec / 9.3
  };
};

// TODO: Encode enhanced weapon - different guns get different bonuses
