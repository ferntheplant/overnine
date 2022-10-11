import type { Modifier } from '../types';
import { rateToMultiplier } from '../stats';

export const DeathStrike: Modifier = (profile, level = 0) => {
	const damage = { 0: 0, 1: 22, 2: 33, 3: 44 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
	};
};

// TODO: Encode bird damage
export const LoyalCompanion: Modifier = (profile, level = 0) => {
	const damage = { 0: 0, 1: 4, 2: 9, 3: 14 };
	const attackPower = { 0: 0, 1: 3, 2: 6, 3: 10 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
		moveSpeed: profile.moveSpeed + (level > 0 ? 4 : 0),
		attackPower: profile.attackPower + attackPower[level]
	};
};
