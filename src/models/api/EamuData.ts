import { ChartDifficultyType, ClearStatus } from "../../consts/Code";

export interface PolarisChordResponse {
  status: number;
  data: PolarisChordData;
}

export interface PolarisChordData {
  status: number;
  fail_code: number;
  score_data: ScoreData;
}

export interface ScoreData {
  usr_music_highscore: UsrMusicHighScore;
}

export interface UsrMusicHighScore {
  music: MusicEntry[];
}

export interface MusicEntry {
  music_id: string;
  name: string;
  composer: string;
  license: string;
  genre: number;
  chart_list: ChartList;
}

export interface ChartList {
  chart: ChartEntry[] | ChartEntry;
}

export interface ChartEntry {
  chart_difficulty_type: ChartDifficultyType;
  difficult: number;
  achievement_rate: number; // 10000 = 100.00%
  highscore: number;
  maxcombo: number;
  combo_rank: number;
  score_rank: number;
  clear_status: ClearStatus;
  play_count: number;
  clear_count: number;
  perfect_clear_count: number;
  full_combo_count: number;
  updated_at: string; // "2024-06-15 19:06:09"
  nice_play_rank: number;
}
