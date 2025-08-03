import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
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

  const setter: Dispatch<SetStateAction<UserSettingValue<K>>> = (value) => {
    const newValue = typeof value === "function" ? value(state) : value;

    const row = { key, value: newValue } as UserSettingRow;
    indexedDB.userSetting.put(row);

    setState(newValue);
  };

  return [isLoaded, state, setter] as const;
}
