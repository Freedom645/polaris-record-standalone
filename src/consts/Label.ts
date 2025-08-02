import { ChartDifficultyType, ClearStatus, Genre } from "./Code";

export const ChartDifficultyLabelMap = {
  [ChartDifficultyType.EASY]: "EASY",
  [ChartDifficultyType.NORMAL]: "NORMAL",
  [ChartDifficultyType.HARD]: "HARD",
  [ChartDifficultyType.INFLUENCE]: "INFLUENCE",
} as const;

export const ClearStatusLabelMap = {
  [ClearStatus.GOOD_TRY]: "Good Try",
  [ClearStatus.SUCCESS]: "Success",
  [ClearStatus.FULL_COMBO]: "Full Combo",
  [ClearStatus.ALL_PERFECT]: "All Perfect",
} as const;

export const GenreLabelMap = {
  [Genre.VIRTUAL]: "Virtual",
  [Genre.SOCIAL_MUSIC]: "ソーシャルミュージック",
  [Genre.ANIME]: "アニメ",
  [Genre.TOUHOU]: "東方",
  [Genre.VARIETY]: "バラエティ",
  [Genre.ORIGINAL]: "オリジナル",
} as const;
