import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const DemonicImpulse: Modifier = (profile, level = 0) => {
  const crit = { 0: 0, 1: 0, 2: 15, 3: 30 };
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(profile.stats.spec / 11.65),
    critRate: profile.critRate + crit[level],
    moveSpeed: profile.moveSpeed + (level > 0 ? 20 : 0)
  };
};

export const PerfectSupression: Modifier = (profile, level = 0) => {
  const damage = { 0: 0, 1: 20, 2: 25, 3: 30 };
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
  };
};
