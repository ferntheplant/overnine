export type Stat = number;
export type Rate = number; // percents
export type Multiplier = number;

export type Stats = {
	crit: Stat;
	swift: Stat;
	spec: Stat;
};
export const StatsNames = <const>['crit', 'swift', 'spec'];

const CRIT_TO_RATE = 28;
const SWIFT_TO_MS = 58;
const SWIFT_TO_AS = 58;
const SWIFT_TO_CDR = 47;

export function critToRate(crit: Stat): Rate {
	return crit / CRIT_TO_RATE;
}

export function swiftToMS(swift: Stat): Rate {
	return swift / SWIFT_TO_MS;
}

export function swiftToAS(swift: Stat): Rate {
	return swift / SWIFT_TO_AS;
}

export function swiftToCDR(swift: Stat): Rate {
	return swift / SWIFT_TO_CDR;
}

export function rateToMultiplier(rate: Rate): Multiplier {
	return 1 + rate / 100;
}

export function rateToDecimal(rate: Rate): number {
	return rate / 100;
}
