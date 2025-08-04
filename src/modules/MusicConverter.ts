import type { PolarisChordMusic } from "@/models/api/Eamu/Music";
import { MusicData } from "@/models/Music";

export function deserializeJsonData(data: PolarisChordMusic): MusicData[] {
  const list = data.data.musiclist.music;

  return list.map((music) => {
    const musicData = new MusicData(
      music.music_id,
      music.name,
      music.composer,
      music.license,
      music.genre
    );

    return musicData;
  });
}
