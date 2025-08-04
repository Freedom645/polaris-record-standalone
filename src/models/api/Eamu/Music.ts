import { Genre } from "@/consts/Code";
import type { PolarisChordResponse } from "./Common";

export type PolarisChordMusic =
  PolarisChordResponse<PolarisChordResponseDataAsMusicList>;

export interface PolarisChordResponseDataAsMusicList {
  musiclist: MusicList;
}

export interface MusicList {
  music: Music[];
}

export interface Music {
  music_id: string;
  genre: Genre;
  name: string;
  composer: string;
  license: string;
  easy: number;
  normal: number;
  hard: number;
  influence: number;
  polar: number;
}
