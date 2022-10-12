import _ from 'lodash';

import { logModifier } from './logger';

import type { Level, Modifier, OptionalKeys } from './types';
import type { Rate, Multiplier, Stats } from './stats';
import {
  StatsNames,
  rateToDecimal,
  rateToMultiplier,
  swiftToAS,
  swiftToCDR,
  swiftToMS,
  critToRate
} from './stats';
import { AllEngravings } from './engravings';
import { RelicSets } from './relics';
import { MiscModifiers } from './misc';
import { AllClasses } from './classes/index';

type Profile = {
  stats: Stats;
  critRate: Rate;
  critDamage: Rate;
  attackPower: Rate;
  attackSpeed: Rate;
  moveSpeed: Rate;
  cooldownReduction: Rate;
  bonusDamage: Multiplier;
};

const AttackPower: Modifier = (profile) => {
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * rateToMultiplier(profile.attackPower)
  };
};

const EffictiveCritMultiplier: Modifier = (profile) => {
  const critRate = critToRate(profile.stats.crit) + profile.critRate;
  const effectiveCritMultiplier =
    1 + (rateToDecimal(profile.critDamage) - 1) * rateToDecimal(critRate);
  return {
    ...profile,
    bonusDamage: profile.bonusDamage * effectiveCritMultiplier
  };
};

const HiddenModifiers = <const>{
  AttackPower,
  EffictiveCritMultiplier
};

type AllEngravingsNames = keyof typeof AllEngravings;
type RelicSetsNames = keyof typeof RelicSets;
type AllClassesNames = keyof typeof AllClasses;
type MiscModifiersNames = keyof typeof MiscModifiers;
type HiddenModifiersNames = keyof typeof HiddenModifiers;

const ALL_MODIFIERS = <const>{
  ...MiscModifiers,
  ...RelicSets,
  ...AllClasses,
  ...AllEngravings, // always compute engravings last
  ...HiddenModifiers
};
type ALL_MODIFIERS_NAMES = keyof typeof ALL_MODIFIERS;

type LevelModifiers = {
  [Key in AllEngravingsNames | RelicSetsNames | AllClassesNames]: Level;
};

type BooleanModifiers = {
  [Key in MiscModifiersNames | HiddenModifiersNames]: boolean;
};

type UserModifiers = LevelModifiers & BooleanModifiers;

export type User = Stats & OptionalKeys<UserModifiers>;
export const UserProps = _.keys(ALL_MODIFIERS).concat(StatsNames) as (keyof User)[];

function userToProfile(user: User): Profile {
  return {
    stats: {
      crit: user.crit,
      swift: user.swift,
      spec: user.spec
    },
    critRate: 0,
    critDamage: 200,
    attackPower: 0,
    attackSpeed: 0,
    moveSpeed: 0,
    bonusDamage: 1,
    cooldownReduction: 0
  };
}

export type Results = {
  attackSpeed: Rate;
  moveSpeed: Rate;
  cooldownReduction: Rate;
  damageMultiplier: Multiplier;
};
export const ResultsProps = (<const>[
  'attackSpeed',
  'moveSpeed',
  'cooldownReduction',
  'damageMultiplier'
]) as readonly (keyof Results)[];

// Computes your theoretical optimal damage multiplier assuming you hit all
// spells with directional, move speed, party synergy, and relic bonuses maxed out
export function computeFinalResults(user: User): Results {
  let profile = userToProfile(user);

  for (const [key, modifier] of Object.entries(ALL_MODIFIERS)) {
    const modifierSetting = user[key as ALL_MODIFIERS_NAMES];
    if (modifierSetting === undefined || modifierSetting === false || modifierSetting === 0) {
      continue;
    }
    const [newProfile, logString] = logModifier(
      modifier,
      profile,
      modifierSetting === true ? undefined : modifierSetting
    );
    if (!_.isEmpty(logString)) console.log(logString);
    profile = newProfile;
  }

  return {
    attackSpeed: profile.attackSpeed + swiftToAS(profile.stats.swift),
    moveSpeed: profile.moveSpeed + swiftToMS(profile.stats.swift),
    cooldownReduction: swiftToCDR(profile.stats.swift) + profile.cooldownReduction,
    damageMultiplier: profile.bonusDamage
  };
}

// All keys except stats optional
export const testUser: User = {
  // base stats
  crit: 1200,
  swift: 800,
  spec: 0,
  // relic sets
  Dominion: 0, // need data for lvl 2 and 3
  Salvation: 0,
  Entropy: 0,
  Hallucination: 0,
  Nightmare: 2,
  // engravings
  Grudge: 3,
  KeenBluntWeapon: 3,
  RaidCaptain: 3,
  PreciseDagger: 0,
  AllOutAttack: 0,
  Barricade: 0,
  HitMaster: 0,
  MasterBrawler: 0,
  AmbushMaster: 3,
  MassIncrease: 0,
  CursedDoll: 0,
  MastersTenacity: 0,
  StabilizedStatus: 0,
  SuperCharge: 0,
  SpiritAbsorption: 0,
  Adrenaline: 2,
  // misc bonuses
  BackAttack: true,
  FrontAttack: false,
  LostWindCliff: true,
  LightOfSalvation: false,
  Yearning: true,
  CritPartySynergy: false,
  AttackPowerPartySynergy: false,
  BonusDamagePartySynergy: true,
  Plus20MoveSpeedSpell: true,
  // class engravings
  DemonicImpulse: 0,
  PerfectSupression: 1,
  EsotericSkill: 0,
  FirstIntention: 0,
  Taijustsu: 0,
  ShockTraining: 0,
  Control: 0,
  Empreror: 0,
  Empress: 0,
  EvolutionaryLegacy: 0,
  ArthetinianSkill: 0,
  DeathStrike: 0,
  LoyalCompanion: 0,
  Reflux: 0,
  Pistoleer: 0,
  // vacuous modifiers
  AttackPower: true,
  EffictiveCritMultiplier: true
};
