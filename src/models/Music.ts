import { ChartDifficultyType, ClearStatus, Genre } from "../consts/Code";

export class MusicData {
  public readonly musicId: string;
  public readonly name: string;
  public readonly composer: string;
  public readonly license: string;
  public readonly genre: Genre;

  constructor(
    musicId: string,
    name: string,
    composer: string,
    license: string,
    genre: Genre
  ) {
    this.musicId = musicId;
    this.name = name;
    this.composer = composer;
    this.license = license;
    this.genre = genre;
  }
}

export class ChartData {
  public readonly music: MusicData;
  public readonly level: number;
  public readonly difficultyType: ChartDifficultyType;
  public readonly achievementRate: number;
  public readonly maxCombo: number;
  public readonly comboRank: number;
  public readonly likes: number;
  public readonly likesRank: number;
  public readonly clearStatus: ClearStatus;
  public readonly clearCount: number;
  public readonly fcCount: number;
  public readonly apCount: number;
  public readonly playCount: number;
  public readonly updateAt: Date;
  public readonly nicePlayRank: number;

  constructor(
    music: MusicData,
    level: number,
    difficultyType: ChartDifficultyType,
    achievementRate: number,
    maxCombo: number,
    comboRank: number,
    likes: number,
    likesRank: number,
    clearStatus: ClearStatus,
    clearCount: number,
    fcCount: number,
    apCount: number,
    playCount: number,
    updateAt: Date,
    nicePlayRank: number
  ) {
    this.music = music;
    this.level = level;
    this.difficultyType = difficultyType;
    this.achievementRate = achievementRate;
    this.maxCombo = maxCombo;
    this.comboRank = comboRank;
    this.likes = likes;
    this.likesRank = likesRank;
    this.clearStatus = clearStatus;
    this.clearCount = clearCount;
    this.fcCount = fcCount;
    this.apCount = apCount;
    this.playCount = playCount;
    this.updateAt = updateAt;
    this.nicePlayRank = nicePlayRank;
  }

  get clearRate(): number {
    return this.calcRate(this.clearCount, this.playCount);
  }

  get fcRate(): number {
    return this.calcRate(this.fcCount, this.playCount);
  }

  get apRate(): number {
    return this.calcRate(this.apCount, this.playCount);
  }

  private calcRate(value: number, base: number) {
    if (base === 0) {
      return 0;
    }
    return value / base;
  }
}
