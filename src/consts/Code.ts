export const ChartDifficultyType = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  INFLUENCE: 3,
} as const;

export type ChartDifficultyType =
  (typeof ChartDifficultyType)[keyof typeof ChartDifficultyType];

export const CHART_DIFFICULTY_LIST: readonly ChartDifficultyType[] =
  Object.values(ChartDifficultyType).sort();

export const ClearStatus = {
  NO_PLAY: 0,
  GOOD_TRY: 1,
  SUCCESS: 2,
  FULL_COMBO: 3,
  ALL_PERFECT: 4,
} as const;

export type ClearStatus = (typeof ClearStatus)[keyof typeof ClearStatus];

export const PLAYED_STATUS_LIST: ReadonlyArray<ClearStatus> = Object.values(
  ClearStatus
).filter((e) => e !== ClearStatus.NO_PLAY);

export const SUCCESS_STATUS_LIST: ReadonlyArray<ClearStatus> =
  PLAYED_STATUS_LIST.filter((e) => e !== ClearStatus.GOOD_TRY);

export const FC_STATUS_LIST: ReadonlyArray<ClearStatus> =
  PLAYED_STATUS_LIST.filter((e) => e !== ClearStatus.SUCCESS);

export const Genre = {
  VIRTUAL: 1 << 0,
  SOCIAL_MUSIC: 1 << 1,
  ANIME: 1 << 2,
  TOUHOU: 1 << 3,
  VARIETY: 1 << 4,
  ORIGINAL: 1 << 5,
} as const;

export type Genre = (typeof Genre)[keyof typeof Genre];

export const LEVEL_LIST: readonly number[] = Array.from(Array(14)).map(
  (_, i) => i + 1
);
