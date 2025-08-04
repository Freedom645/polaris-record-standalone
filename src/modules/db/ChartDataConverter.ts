import type { PolarisChordChartData } from "@/models/api/Eamu/Chart";
import type { ScoreDataRow } from "@/models/db/ScoreData";
import { ChartData, ChartKey, MusicData, ScoreData } from "@/models/Music";
import { normalizeArray } from "@/utils/ArrayUtil";
import { parse } from "date-fns";

export function serializeRow(musicData: MusicData): ScoreDataRow[] {
  return Array.from(musicData.scoreList.values()).map((data) => ({
    musicId: musicData.musicId,
    name: musicData.name,
    composer: musicData.composer,
    license: musicData.license,
    genre: musicData.genre,
    level: musicData.chartList.get(data.chartKey.toKey())?.level ?? 0,
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
  }));
}

export function deserializeRow(data: ScoreDataRow[]): MusicData[] {
  const musicMap = data.reduce((musicMap, row) => {
    const chartKey = new ChartKey(row.musicId, row.difficultyType);
    const [tableRow, chartList, scoreList] = musicMap.get(chartKey.toKey()) ?? [
      row,
      [],
      [],
    ];

    chartList.push(new ChartData({ ...row }));
    scoreList.push(new ScoreData({ ...row, updateAt: new Date(row.updateAt) }));

    musicMap.set(chartKey.toKey(), [tableRow, chartList, scoreList]);
    return musicMap;
  }, new Map<string, [ScoreDataRow, ChartData[], ScoreData[]]>());

  return Array.from(musicMap.values()).map(
    ([tableRow, chartList, scoreList]) => {
      return new MusicData({
        ...tableRow,
        chartList,
        scoreList,
      });
    }
  );
}

export function deserializeJsonData(data: PolarisChordChartData): MusicData[] {
  const list = data.data.score_data.usr_music_highscore.music;

  return list.map((musicResponse) => {
    const chartScoreList = normalizeArray(musicResponse.chart_list.chart).map(
      (chart) =>
        [
          new ChartData({
            musicId: musicResponse.music_id,
            difficultyType: chart.chart_difficulty_type,
            level: chart.difficult,
          }),
          new ScoreData({
            musicId: musicResponse.music_id,
            difficultyType: chart.chart_difficulty_type,
            achievementRate: chart.achievement_rate / 100,
            maxCombo: chart.maxcombo,
            comboRank: chart.combo_rank,
            likes: chart.highscore,
            likesRank: chart.score_rank,
            clearStatus: chart.clear_status,
            clearCount: chart.clear_count,
            fcCount: chart.full_combo_count,
            apCount: chart.perfect_clear_count,
            playCount: chart.play_count,
            updateAt: parse(
              chart.updated_at,
              "yyyy-MM-dd HH:mm:ss",
              new Date()
            ),
            nicePlayRank: chart.nice_play_rank,
          }),
        ] as const
    );
    const musicData = new MusicData({
      musicId: musicResponse.music_id,
      name: musicResponse.name,
      composer: musicResponse.composer,
      license: musicResponse.license,
      genre: musicResponse.genre,
      chartList: chartScoreList.map(([e]) => e),
      scoreList: chartScoreList.map(([, e]) => e),
    });
    return musicData;
  });
}
