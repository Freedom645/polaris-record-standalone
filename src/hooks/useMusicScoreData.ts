import { indexedDB } from "@/db/AppDatabase";
import { MusicData } from "@/models/Music";
import { deserializeRow } from "@/modules/db/ChartDataConverter";
import { useApi } from "@/utils/ApiClient";
import { useEffect, useState } from "react";

export function useMusicScoreData() {
  const { getMusics } = useApi();
  const [isLoadedMusicScoreData, setIsLoadedMusicScoreData] = useState(false);
  const [musicData, setMusicData] = useState<MusicData[]>([]);

  useEffect(() => {
    const init = async () => {
      const promiseTasks = [
        getMusics().catch(() => []),
        indexedDB.scoreData
          .toArray()
          .then((records) => deserializeRow(records)),
      ] as const;

      const [masterData, dbMusicData] = await Promise.all(promiseTasks);
      setMusicData(MusicData.mergeList(masterData, dbMusicData));
      setIsLoadedMusicScoreData(true);
    };

    init();
  }, [getMusics]);

  return { musicData, isLoadedMusicScoreData };
}
