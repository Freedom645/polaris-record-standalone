import type { DatasetElementType } from "@mui/x-charts/internals";

export interface PlayStatistics {
  summary: Summary;
  difficulty: readonly CountByClearStatus[];
  level: readonly CountByClearStatus[];
}

export interface Summary {
  totalPlayCount: number;
  totalGoodTryCount: number;
  totalClearCount: number;
  totalFcCount: number;
  totalApCount: number;
}

export type CountByClearStatus = DatasetElementType<string | number> & {
  key: string;
  noPlay: number;
  goodTry: number;
  clear: number;
  fc: number;
  ap: number;
};
