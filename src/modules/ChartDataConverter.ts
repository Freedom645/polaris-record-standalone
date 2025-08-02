import type { ScoreDataRow } from "@/db/AppDatabase";
import type { PolarisChordResponse } from "@/models/api/EamuData";
import { ChartData, MusicData } from "@/models/Table";
import { normalizeArray } from "@/utils/ArrayUtil";
import { parse } from "date-fns";

export function serializeRow(data: ChartData): ScoreDataRow {
  return {
    musicId: data.music.musicId,
    name: data.music.name,
    composer: data.music.composer,
    license: data.music.license,
    genre: data.music.genre,
    level: data.level,
    difficultyType: data.difficultyType,
    achievementRate: data.achievementRate,
    maxCombo: data.maxCombo,
    comboRank: data.comboRank,
    likes: data.likes,
    likesRank: data.likesRank,
    clearStatus: data.clearStatus,
    clearCount: data.clearCount,
    fcCount: data.fcCount,
    apCount: data.apCount,
    playCount: data.playCount,
    updateAt: data.updateAt.toISOString(),
    nicePlayRank: data.nicePlayRank,
  };
}

export function deserializeRow(data: ScoreDataRow): ChartData {
  const music = new MusicData(
    data.musicId,
    data.name,
    data.composer,
    data.license,
    data.genre
  );
  return new ChartData(
    music,
    data.level,
    data.difficultyType,
    data.achievementRate,
    data.maxCombo,
    data.comboRank,
    data.likes,
    data.likesRank,
    data.clearStatus,
    data.clearCount,
    data.fcCount,
    data.apCount,
    data.playCount,
    new Date(data.updateAt),
    data.nicePlayRank
  );
}

export function deserializeJsonData(data: PolarisChordResponse): ChartData[] {
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
