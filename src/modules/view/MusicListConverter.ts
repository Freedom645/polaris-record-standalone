import { ScoreData, type MusicData } from "@/models/Music";
import type { TableRow } from "@/models/view/MusicList";

export function convertToTableRow(musicData: MusicData): TableRow[] {
  return Array.from(musicData.chartList.entries()).flatMap(([key, chart]) => {
    const score =
      musicData.scoreList.get(key) ?? ScoreData.empty({ ...chart.chartKey });

    const row: TableRow = {
      music: {
        ...musicData,
      },
      ...chart,
      ...score,
      isPlayed: score.updateAt.getTime() === 0,
    };
    return row;
  });
}
