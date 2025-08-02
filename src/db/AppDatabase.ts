import type { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";
import Dexie, { type Table } from "dexie";

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

export type UserSettingRow =
  | UserSettingScoreTableFilterIsSave
  | UserSettingScoreTableFilter
  | UserSettingScoreTableVisibility;

export interface UserSettingScoreTableFilterIsSave {
  key: "score-table-filter-is-save";
  value: boolean;
}
export interface UserSettingScoreTableFilter {
  key: "score-table-filter";
  value: Array<{ id: string; value: unknown }>;
}
export interface UserSettingScoreTableVisibility {
  key: "score-table-visibility";
  value: Record<string, boolean>;
}

class AppDatabase extends Dexie {
  scoreData!: Table<ScoreDataRow, [string, string]>;
  userSetting!: Table<UserSettingRow, string>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      scoreData: "[musicId+difficultyType]",
      userSetting: "key",
    });
  }
}

export const indexedDB = new AppDatabase();
