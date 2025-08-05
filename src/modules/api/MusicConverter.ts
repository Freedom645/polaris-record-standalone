import { ChartDifficultyType } from "@/consts/Code";
import type { PolarisChordMusic } from "@/models/api/Eamu/Music";
import { ChartData, MusicData } from "@/models/Music";
import { typedEntries } from "@/utils/ArrayUtil";

export function deserializeJsonData(data: PolarisChordMusic): MusicData[] {
  const list = data.data.musiclist.music;

  return list.map((music) => {
    const chartList = typedEntries({
      [ChartDifficultyType.EASY]: music.easy,
      [ChartDifficultyType.NORMAL]: music.normal,
      [ChartDifficultyType.HARD]: music.hard,
      [ChartDifficultyType.INFLUENCE]: music.influence,
    } as const).flatMap(([type, level]) =>
      level === 0
        ? []
        : new ChartData({
            musicId: music.music_id,
            difficultyType: type as ChartDifficultyType,
            level,
          })
    );

    const musicData = new MusicData({
      ...music,
      musicId: music.music_id,
      chartList,
      scoreList: [],
    });

    return musicData;
  });
}
