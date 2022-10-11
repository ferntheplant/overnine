import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const ShockTraining: Modifier = (profile, level = 0) => {
	const damage = { 0: 0, 1: 10, 2: 15, 3: 20 };
	return {
		...profile,
		bonusDamage:
			profile.bonusDamage *
			rateToMultiplier(profile.stats.spec / 17.5) *
			rateToMultiplier(damage[level])
	};
};

export const Taijustsu: Modifier = (profile, level = 0) => {
	const damage = { 0: 0, 1: 35, 2: 50, 3: 65 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
	};
};
