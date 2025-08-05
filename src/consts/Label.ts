import { ChartDifficultyType, ClearStatus, Genre } from "./Code";

export const ChartDifficultyLabelMap = {
  [ChartDifficultyType.EASY]: "EASY",
  [ChartDifficultyType.NORMAL]: "NORMAL",
  [ChartDifficultyType.HARD]: "HARD",
  [ChartDifficultyType.INFLUENCE]: "INFLUENCE",
} as const;

export const ClearStatusLabelMap = {
  [ClearStatus.NO_PLAY]: "NO PLAY",
  [ClearStatus.GOOD_TRY]: "GOOD TRY",
  [ClearStatus.SUCCESS]: "SUCCESS",
  [ClearStatus.FULL_COMBO]: "FULL COMBO",
  [ClearStatus.ALL_PERFECT]: "ALL PERFECT",
} as const;

export const GenreLabelMap = {
  [Genre.VIRTUAL]: "Virtual",
  [Genre.SOCIAL_MUSIC]: "ソーシャルミュージック",
  [Genre.ANIME]: "アニメ",
  [Genre.TOUHOU]: "東方",
  [Genre.VARIETY]: "バラエティ",
  [Genre.ORIGINAL]: "オリジナル",
} as const;
