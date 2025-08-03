import { useState, useEffect, type SetStateAction } from "react";
import { indexedDB } from "@/db/AppDatabase";
import type {
  UserSettingMap,
  UserSettingRow,
  UserSettingValue,
} from "@/models/db/UserSetting";

export function useUserSettingState<K extends keyof UserSettingMap>(
  key: K,
  defaultValue: UserSettingValue<K>
) {
  const [isLoaded, setLoaded] = useState(false);
  const [state, setState] = useState<UserSettingValue<K>>(defaultValue);
  const [isSynchronizeDb, setIsSynchronizeDb] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await indexedDB.userSetting.get(key);
      if (result !== undefined) {
        setState(result.value as UserSettingValue<K>);
      }
      setLoaded(true);
    };
    load();
  }, [key]);

  const setValue = (value: SetStateAction<UserSettingValue<K>>) => {
    if (isSynchronizeDb) {
      setIndexedDB(value);
    }
    setState(value);
  };

  const setIndexedDB = (value: SetStateAction<UserSettingValue<K>>) => {
    const newValue = typeof value === "function" ? value(state) : value;
    indexedDB.userSetting.put({ key, value: newValue } as UserSettingRow);
  };

  return [isLoaded, state, setValue, setIsSynchronizeDb, setIndexedDB] as const;
}
