import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const Control: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 18, 2: 27, 3: 36 };
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
  };
};

// TODO: Pinnacle???
