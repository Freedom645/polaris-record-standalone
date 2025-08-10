import { CHART_DIFFICULTY_LIST, ClearStatus, LEVEL_LIST } from "@/consts/Code";
import { MusicData, ScoreData } from "@/models/Music";
import type {
  CountByClearStatus,
  PlayStatistics,
  Summary,
} from "@/models/view/PlayStatistics";
import { typedEntries } from "@/utils/ArrayUtil";
import { getDifficultyLabel } from "@/utils/LabelUtil";

export function convertToPlayStatistics(data: MusicData[]): PlayStatistics {
  return {
    summary: calculateSummary(
      data.flatMap((musicData) => [...musicData.scoreList.values()])
    ),
    difficulty: CHART_DIFFICULTY_LIST.reduce(
      (obj, diff) => [
        ...obj,
        calculateCount(
          getDifficultyLabel(diff),
          data.flatMap((m) => m.filterScoreData({ difficultyType: diff }))
        ),
      ],
      [] as CountByClearStatus[]
    ),
    level: LEVEL_LIST.reduce(
      (obj, level) => [
        ...obj,
        calculateCount(
          `Lv${level.toString()}`,
          data.flatMap((m) => m.filterScoreData({ level }))
        ),
      ],
      [] as CountByClearStatus[]
    ),
  };
}

function emptySummary(): Summary {
  return {
    totalPlayCount: 0,
    totalGoodTryCount: 0,
    totalClearCount: 0,
    totalFcCount: 0,
    totalApCount: 0,
  };
}

function calculateSummary(data: ScoreData[]): Summary {
  const baseSummary = emptySummary();
  if (data.length === 0) {
    return baseSummary;
  }

  const MAPPER = {
    totalPlayCount: "playCount",
    totalClearCount: "clearCount",
    totalFcCount: "fcCount",
    totalApCount: "apCount",
  } as const;

  const summaryData = data.reduce<Summary>((stat, scoreData) => {
    typedEntries(MAPPER).forEach(
      ([key, refKey]) => (stat[key] += scoreData[refKey])
    );

    return stat;
  }, baseSummary);

  summaryData.totalGoodTryCount =
    summaryData.totalPlayCount - summaryData.totalClearCount;
  summaryData.totalClearCount -= summaryData.totalFcCount;
  summaryData.totalFcCount -= summaryData.totalApCount;

  return summaryData;
}

function emptyCount(key: string): CountByClearStatus {
  return {
    key,
    total: 0,
    noPlay: 0,
    goodTry: 0,
    clear: 0,
    fc: 0,
    ap: 0,
  };
}

function calculateCount(key: string, data: ScoreData[]): CountByClearStatus {
  const baseCounter = emptyCount(key);

  const MAPPER = {
    [ClearStatus.NO_PLAY]: "noPlay",
    [ClearStatus.GOOD_TRY]: "goodTry",
    [ClearStatus.SUCCESS]: "clear",
    [ClearStatus.FULL_COMBO]: "fc",
    [ClearStatus.ALL_PERFECT]: "ap",
  } as const;

  const countData = data.reduce<CountByClearStatus>((stat, scoreData) => {
    stat[MAPPER[scoreData.clearStatus]]++;
    return stat;
  }, baseCounter);

  return countData;
}
