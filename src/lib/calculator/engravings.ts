import type { Modifier } from './types';
import { rateToMultiplier, swiftToMS } from './stats';

export const Grudge: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 4, 2: 10, 3: 20 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const KeenBluntWeapon: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 10, 2: 25, 3: 50 };
	return {
		...profile,
		critDamage: profile.critDamage + rates[level],
		bonusDamage: profile.bonusDamage * 0.98
	};
};

export const RaidCaptain: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 10, 2: 22, 3: 45 };
	const moveSpeed = Math.min(swiftToMS(profile.stats.swift) + profile.moveSpeed, 40);
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier((moveSpeed * rates[level]) / 100)
	};
};

export const PreciseDagger: Modifier = (profile, level = 0) => {
	const critRates = { 0: 0, 1: 4, 2: 10, 3: 20 };
	return {
		...profile,
		critRate: profile.critRate + critRates[level],
		critDamage: profile.critDamage - 12
	};
};

export const AllOutAttack: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 4, 2: 10, 3: 20 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const Barricade: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 3, 2: 8, 3: 16 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const HitMaster: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 3, 2: 8, 3: 16 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const MasterBrawler: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 5, 2: 12, 3: 25 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const AmbushMaster: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 5, 2: 12, 3: 25 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const MassIncrease: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 4, 2: 10, 3: 18 };
	return {
		...profile,
		attackPower: profile.attackPower + rates[level],
		attackSpeed: profile.attackSpeed - 10
	};
};

export const CursedDoll: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 3, 2: 8, 3: 16 };
	return {
		...profile,
		attackPower: profile.attackPower + rates[level]
	};
};

export const MastersTenacity: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 3, 2: 8, 3: 16 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const StabilizedStatus: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 3, 2: 8, 3: 16 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const SuperCharge: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 4, 2: 10, 3: 20 };
	return {
		...profile,
		bonusDamage: profile.bonusDamage * rateToMultiplier(rates[level])
	};
};

export const SpiritAbsorption: Modifier = (profile, level = 0) => {
	const rates = { 0: 0, 1: 3, 2: 8, 3: 15 };
	return {
		...profile,
		attackSpeed: profile.attackSpeed + rates[level],
		moveSpeed: profile.moveSpeed + rates[level]
	};
};

export const Adrenaline: Modifier = (profile, level = 0) => {
	const critRates = { 0: 0, 1: 5, 2: 10, 3: 15 };
	const powers = { 0: 0, 1: 1.8, 2: 3.6, 3: 6 };
	return {
		...profile,
		attackPower: profile.attackPower + powers[level],
		critRate: profile.critRate + critRates[level]
	};
};

export const AllEngravings = <const>{
	Grudge: Grudge,
	KeenBluntWeapon: KeenBluntWeapon,
	PreciseDagger: PreciseDagger,
	AllOutAttack: AllOutAttack,
	Barricade: Barricade,
	HitMaster: HitMaster,
	MasterBrawler: MasterBrawler,
	AmbushMaster: AmbushMaster,
	MassIncrease: MassIncrease,
	CursedDoll: CursedDoll,
	MastersTenacity: MastersTenacity,
	StabilizedStatus: StabilizedStatus,
	SuperCharge: SuperCharge,
	SpiritAbsorption: SpiritAbsorption,
	Adrenaline: Adrenaline,
	RaidCaptain: RaidCaptain // always do raid captain last
};
