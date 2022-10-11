import type { Modifier } from './types';
import { rateToMultiplier } from './stats';

export const Entropy: Modifier = (profile, level = 0) => {
	const crit = { 0: 0, 1: 17, 2: 20, 3: 22 };
	const critDamage = { 0: 0, 1: 55, 2: 60, 3: 65 };
	const damage = { 0: 0, 1: 21, 2: 24, 3: 26 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
		critDamage: profile.critDamage + critDamage[level],
		critRate: profile.critRate + crit[level]
	};
};

export const Hallucination: Modifier = (profile, level = 0) => {
	const crit = { 0: 0, 1: 20, 2: 25, 3: 28 };
	const damage = { 0: 0, 1: 25, 2: 29, 3: 32 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
		critRate: profile.critRate + crit[level]
	};
};

export const Nightmare: Modifier = (profile, level = 0) => {
	const damage = { 0: 0, 1: 42, 2: 51, 3: 57 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level])
	};
};

export const Salvation: Modifier = (profile, level = 0) => {
	const damage = { 0: 0, 1: 47, 2: 59, 3: 71 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
		attackSpeed: profile.attackSpeed + 10
	};
};

// TODO: get higher level set bonuses
export const Dominion: Modifier = (profile, level = 0) => {
	const cooldown = { 0: 0, 1: 48, 2: 40, 3: 48 };
	const damage = { 0: 0, 1: 40, 2: 40, 3: 40 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(damage[level]),
		cooldownReduction: profile.cooldownReduction + cooldown[level]
	};
};

// TODO: encode partial relic sets
export const RelicSets = <const>{
	Entropy: Entropy,
	Hallucination: Hallucination,
	Nightmare: Nightmare,
	Salvation: Salvation,
	Dominion: Dominion
};
