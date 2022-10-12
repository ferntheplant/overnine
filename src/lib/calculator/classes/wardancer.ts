import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const FirstIntention: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 16, 2: 24, 3: 32 };
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
  };
};

// TODO: surface that orb damage boost averaged at 3 orbs
export const EsotericSkill: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 24, 2: 30, 3: 36 };
  return {
    ...profile,
    bonusDamage:
      profile.bonusDamage *
      rateToMultiplier(damage[level]) *
      rateToMultiplier(profile.stats.spec / 26.9)
  };
};
