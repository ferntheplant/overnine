import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const Reflux: Modifier = (profile, level = 0) => {
	const cooldown = { 0: 0, 1: 3, 2: 6, 3: 10 };
	const damage = { 0: 0, 1: 8, 2: 12, 3: 16 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
		cooldownReduction: profile.cooldownReduction + cooldown[level]
	};
};

// TODO: encode igniter
