import type { Modifier } from './types';
import { rateToMultiplier } from './stats';

export const BackAttack: Modifier = (profile) => {
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(5),
		critRate: profile.critRate + 10
	};
};

export const FrontAttack: Modifier = (profile) => {
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(20)
	};
};

export const LostWindCliff: Modifier = (profile) => {
	return {
		...profile,
		critRate: profile.critRate + 7
	};
};

export const CritPartySynergy: Modifier = (profile) => {
	return {
		...profile,
		critRate: profile.critRate + 10
	};
};

export const Yearning: Modifier = (profile) => {
	return {
		...profile,
		moveSpeed: profile.moveSpeed + 8,
		attackSpeed: profile.attackSpeed + 8
	};
};

export const AttackPowerPartySynergy: Modifier = (profile) => {
	return {
		...profile,
		attackPower: profile.attackSpeed + 10
	};
};

export const LightOfSalvation: Modifier = (profile) => {
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(7)
	};
};

export const BonusDamagePartySynergy: Modifier = (profile) => {
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(10)
	};
};

export const Plus20MoveSpeedSpell: Modifier = (profile) => {
	return {
		...profile,
		moveSpeed: profile.moveSpeed + 20
	};
};

export const MiscModifiers = <const>{
	BackAttack: BackAttack,
	FrontAttack: FrontAttack,
	LostWindCliff: LostWindCliff,
	LightOfSalvation: LightOfSalvation,
	Yearning: Yearning,
	CritPartySynergy: CritPartySynergy,
	AttackPowerPartySynergy: AttackPowerPartySynergy,
	BonusDamagePartySynergy: BonusDamagePartySynergy,
	Plus20MoveSpeedSpell: Plus20MoveSpeedSpell
};
