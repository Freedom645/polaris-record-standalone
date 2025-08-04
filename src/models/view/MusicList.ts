import type { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";

export interface TableRow {
  readonly music: {
    readonly musicId: string;
    readonly name: string;
    readonly composer: string;
    readonly license: string;
    readonly genre: Genre;
  };
  readonly difficultyType: ChartDifficultyType;
  readonly level: number;
  readonly achievementRate: number;
  readonly maxCombo: number;
  readonly comboRank: number;
  readonly likes: number;
  readonly likesRank: number;
  readonly clearStatus: ClearStatus;
  readonly clearCount: number;
  readonly fcCount: number;
  readonly apCount: number;
  readonly playCount: number;
  readonly updateAt: Date;
  readonly nicePlayRank: number;
  readonly isPlayed: boolean;
}
