import { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";
import {
  ChartDifficultyLabelMap,
  ClearStatusLabelMap,
  GenreLabelMap,
} from "@/consts/Label";

export function getDifficultyLabel(
  diff: ChartDifficultyType,
  defaultValue = "UNKNOWN"
): string {
  return ChartDifficultyLabelMap?.[diff] ?? defaultValue;
}

export function getClearStatusLabel(
  status: ClearStatus,
  defaultValue = "UNKNOWN"
): string {
  return ClearStatusLabelMap?.[status] ?? defaultValue;
}

export function getGenreLabel(value: Genre, defaultValue = "UNKNOWN"): string {
  return GenreLabelMap?.[value] ?? defaultValue;
}

export function getGenreLabels(value: number): string[] {
  return (Object.values(Genre) as number[])
    .filter((flag) => (value & flag) !== 0)
    .map((flag) => GenreLabelMap[flag as Genre]);
}
