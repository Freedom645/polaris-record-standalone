export const ChartDifficultyType = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  INFLUENCE: 3,
} as const;

export type ChartDifficultyType =
  (typeof ChartDifficultyType)[keyof typeof ChartDifficultyType];

export const ClearStatus = {
  GOOD_TRY: 1,
  SUCCESS: 2,
  FULL_COMBO: 3,
  ALL_PERFECT: 4,
} as const;

export type ClearStatus = (typeof ClearStatus)[keyof typeof ClearStatus];

export const Genre = {
  VIRTUAL: 1 << 0,
  SOCIAL_MUSIC: 1 << 1,
  ANIME: 1 << 2,
  TOUHOU: 1 << 3,
  VARIETY: 1 << 4,
  ORIGINAL: 1 << 5,
} as const;

export type Genre = (typeof Genre)[keyof typeof Genre];
