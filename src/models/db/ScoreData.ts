import type { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";

export interface ScoreDataRow {
  musicId: string;
  name: string;
  composer: string;
  license: string;
  genre: Genre;
  level: number;
  difficultyType: ChartDifficultyType;
  achievementRate: number;
  maxCombo: number;
  comboRank: number;
  likes: number;
  likesRank: number;
  clearStatus: ClearStatus;
  clearCount: number;
  fcCount: number;
  apCount: number;
  playCount: number;
  updateAt: string;
  nicePlayRank: number;
}
