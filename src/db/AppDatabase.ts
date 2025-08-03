import type { ScoreDataRow } from "@/models/db/ScoreData";
import type { UserSettingMap, UserSettingRow } from "@/models/db/UserSetting";
import Dexie, { type Table } from "dexie";

class AppDatabase extends Dexie {
  scoreData!: Table<
    ScoreDataRow,
    [ScoreDataRow["musicId"], ScoreDataRow["difficultyType"]]
  >;
  userSetting!: Table<UserSettingRow, keyof UserSettingMap>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      scoreData: "[musicId+difficultyType]",
      userSetting: "key",
    });
  }
}

export const indexedDB = new AppDatabase();
