import type { PolarisChordMusic } from "@/models/api/Eamu/Music";
import { deserializeJsonData } from "@/modules/MusicConverter";
import Axios from "axios";
import { useCallback, useMemo } from "react";

export function useApi() {
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: import.meta.env.BASE_URL,
    });
    return axios;
  }, []);

  return {
    getMusics: useCallback(
      async () =>
        deserializeJsonData(
          (await axios.get<PolarisChordMusic>("/data/musics.json")).data
        ),
      [axios]
    ),
  };
}
