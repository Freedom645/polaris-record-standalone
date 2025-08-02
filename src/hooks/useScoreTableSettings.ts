import { useEffect, useRef, useState } from "react";
import { indexedDB } from "@/models/db/ScoreDataTable";
import type {
  MRT_ColumnFiltersState,
  MRT_VisibilityState,
} from "material-react-table";

export function useScoreTableSettings() {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    {}
  );
  const [isSettingLoaded, setIsSettingLoaded] = useState(false);

  const filtersRef = useRef(columnFilters);
  const visibilityRef = useRef(columnVisibility);

  useEffect(() => {
    filtersRef.current = columnFilters;
  }, [columnFilters]);

  useEffect(() => {
    visibilityRef.current = columnVisibility;
  }, [columnVisibility]);

  useEffect(() => {
    let isLoaded = false;

    const load = async () => {
      const settings = await indexedDB.userSetting.toArray();
      for (const s of settings) {
        if (s.key === "score-table-filter") {
          setColumnFilters(s.value);
          filtersRef.current = s.value;
        }
        if (s.key === "score-table-visibility") {
          setColumnVisibility(s.value);
          visibilityRef.current = s.value;
        }
      }
      isLoaded = true;
      setIsSettingLoaded(true);
    };

    const unload = () => {
      if (!isLoaded) {
        return;
      }
      indexedDB.userSetting.put({
        key: "score-table-filter",
        value: filtersRef.current,
      });
      indexedDB.userSetting.put({
        key: "score-table-visibility",
        value: visibilityRef.current,
      });
    };

    load();
    window.addEventListener("beforeunload", unload);
    window.addEventListener("pagehide", unload);
    return () => {
      unload();
      window.removeEventListener("beforeunload", unload);
      window.removeEventListener("pagehide", unload);
    };
  }, []);

  return {
    isSettingLoaded,
    columnFilters,
    columnVisibility,
    setColumnFilters,
    setColumnVisibility,
  };
}
