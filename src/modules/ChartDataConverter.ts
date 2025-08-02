import type { PolarisChordResponse } from "@/models/EamuData";
import { ChartData, MusicData } from "@/models/Table";
import { normalizeArray } from "@/utils/ArrayUtil";
import { parse } from "date-fns";

export function deserializeData(data: PolarisChordResponse): ChartData[] {
  const list = data.data.score_data.usr_music_highscore.music;

  return list.flatMap((music) => {
    const musicData = new MusicData(
      music.music_id,
      music.name,
      music.composer,
      music.license,
      music.genre
    );
    return normalizeArray(music.chart_list.chart).map(
      (chart) =>
        new ChartData(
          musicData,
          chart.difficult,
          chart.chart_difficulty_type,
          chart.achievement_rate / 100,
          chart.maxcombo,
          chart.combo_rank,
          chart.highscore,
          chart.score_rank,
          chart.clear_status,
          chart.clear_count,
          chart.full_combo_count,
          chart.perfect_clear_count,
          chart.play_count,
          parse(chart.updated_at, "yyyy-MM-dd HH:mm:ss", new Date()),
          chart.nice_play_rank
        )
    );
  });
}
