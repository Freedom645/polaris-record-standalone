export interface UserSettingMap {
  "score-table-filter-is-save": boolean;
  "score-table-display-no-play": boolean;
  "score-table-filter": Array<{ id: string; value: unknown }>;
  "score-table-visibility": Record<string, boolean>;
}
export type UserSettingValue<K extends keyof UserSettingMap> =
  UserSettingMap[K];

export type UserSettingRow = {
  [K in keyof UserSettingMap]: {
    key: K;
    value: UserSettingMap[K];
  };
}[keyof UserSettingMap];
