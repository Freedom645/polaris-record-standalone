import { useEffect, useState } from "react";
import { useUserSettingState } from "./useUserSettingState";

export function useScoreTableSettings() {
  const [
    isLoadedColumnFilters,
    columnFilters,
    setColumnFilters,
    setIsSyncFilters,
    setColumnFiltersToDb,
  ] = useUserSettingState("score-table-filter", []);
  const [isLoadedSaveFilter, isSaveFilter, setIsSaveFilter] =
    useUserSettingState("score-table-filter-is-save", false);
  const [isLoadedDisplayNoPlay, displayNoPlay, setDisplayNoPlay] =
    useUserSettingState("score-table-display-no-play", true);
  const [isLoadedColumnVisibility, columnVisibility, setColumnVisibility] =
    useUserSettingState("score-table-visibility", {});

  const [isSettingLoaded, setIsSettingLoaded] = useState(false);

  useEffect(() => {
    const targets = [
      isLoadedColumnFilters,
      isLoadedSaveFilter,
      isLoadedColumnVisibility,
      isLoadedDisplayNoPlay,
    ] as const;
    if (targets.every((e) => e)) {
      setIsSettingLoaded(true);
    }
  }, [
    isLoadedColumnFilters,
    isLoadedSaveFilter,
    isLoadedColumnVisibility,
    isLoadedDisplayNoPlay,
  ]);

  useEffect(() => {
    if (!isSettingLoaded) {
      return;
    }
    setIsSyncFilters(isSaveFilter);

    if (isSaveFilter) {
      setColumnFiltersToDb(columnFilters);
    } else {
      setColumnFiltersToDb([]);
    }
  }, [
    columnFilters,
    isSaveFilter,
    isSettingLoaded,
    setColumnFiltersToDb,
    setIsSyncFilters,
  ]);

  return {
    isSettingLoaded,
    isSaveFilter,
    displayNoPlay,
    columnFilters,
    columnVisibility,
    setIsSaveFilter,
    setDisplayNoPlay,
    setColumnFilters,
    setColumnVisibility,
  };
}
