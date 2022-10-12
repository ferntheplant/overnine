import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

// TODO: encode 0.5s CD reduction
export const EvolutionaryLegacy: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 6, 2: 12, 3: 18 };
  return {
    ...profile,
    bonusDamage:
      profile.bonusDamage *
      rateToMultiplier(damage[level]) *
      rateToMultiplier(profile.stats.spec / 11.3)
  };
};

export const ArthetinianSkill: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 15, 2: 20, 3: 25 };
  return {
    ...profile,
    // TODO: encode only join/drone skill damage boosted
    bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
    moveSpeed: profile.moveSpeed + (level > 0 ? 10 : 0)
  };
};
