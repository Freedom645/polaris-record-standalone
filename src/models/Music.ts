import { ChartDifficultyType, ClearStatus, Genre } from "@/consts/Code";
import { toMap } from "@/utils/ArrayUtil";
import { fromUnixTime } from "date-fns";

export class MusicData {
  public readonly musicId: string;
  public readonly name: string;
  public readonly composer: string;
  public readonly license: string;
  public readonly genre: Genre;
  public readonly chartList: ReadonlyMap<string, ChartData>;
  public readonly scoreList: ReadonlyMap<string, ScoreData>;

  constructor(args: {
    musicId: string;
    name: string;
    composer: string;
    license: string;
    genre: Genre;
    chartList: ChartData[];
    scoreList: ScoreData[];
  }) {
    this.musicId = args.musicId;
    this.name = args.name;
    this.composer = args.composer;
    this.license = args.license;
    this.genre = args.genre;

    this.chartList = toMap(args.chartList, (c) => c.chartKey.toKey());
    this.scoreList = toMap(args.scoreList, (c) => c.chartKey.toKey());
  }

  public static mergeList(a: MusicData[], b: MusicData[]): MusicData[] {
    const mergedMap = [...a, ...b].reduce<Map<string, MusicData>>(
      (mapObj, data) => {
        const hasMusic = mapObj.get(data.musicId);
        if (hasMusic == null) {
          return mapObj.set(data.musicId, data);
        }
        return mapObj.set(data.musicId, data.merge(hasMusic));
      },
      new Map()
    );

    return Array.from(mergedMap.values());
  }

  public static merge(a: MusicData, b: MusicData): MusicData {
    if (a.musicId !== b.musicId) {
      throw new Error(
        `異なるmusicIdが指定されました。 ${a.musicId}, ${b.musicId}`
      );
    }
    const chartList = [...a.chartList.values(), ...b.chartList.values()];
    const scoreList = [...a.scoreList.values(), ...b.scoreList.values()];

    return new MusicData({ ...a, ...b, chartList, scoreList });
  }

  public merge(other: MusicData): MusicData {
    return MusicData.merge(this, other);
  }
}

export class ChartKey {
  public readonly musicId: string;
  public readonly difficultyType: ChartDifficultyType;
  constructor(musicId: string, difficultyType: ChartDifficultyType) {
    this.musicId = musicId;
    this.difficultyType = difficultyType;
  }

  public toKey(): string {
    return `${this.musicId}-${this.difficultyType}`;
  }
}

export class ChartData {
  public readonly chartKey: ChartKey;
  public readonly level: number;
  public readonly difficultyType: ChartDifficultyType;

  constructor(args: {
    musicId: string;
    difficultyType: ChartDifficultyType;
    level: number;
  }) {
    this.chartKey = new ChartKey(args.musicId, args.difficultyType);
    this.difficultyType = args.difficultyType;
    this.level = args.level;
  }
}

export class ScoreData {
  public readonly chartKey: ChartKey;
  public readonly musicId: string;
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

  constructor(args: {
    musicId: string;
    difficultyType: ChartDifficultyType;
    achievementRate: number;
    maxCombo: number;
    comboRank: number;
    likes: number;
    likesRank: number;
    clearStatus: ClearStatus;
    clearCount: number;
    fcCount: number;
    apCount: number;
    playCount: number;
    updateAt: Date;
    nicePlayRank: number;
  }) {
    this.chartKey = new ChartKey(args.musicId, args.difficultyType);
    this.musicId = args.musicId;
    this.difficultyType = args.difficultyType;
    this.achievementRate = args.achievementRate;
    this.maxCombo = args.maxCombo;
    this.comboRank = args.comboRank;
    this.likes = args.likes;
    this.likesRank = args.likesRank;
    this.clearStatus = args.clearStatus;
    this.clearCount = args.clearCount;
    this.fcCount = args.fcCount;
    this.apCount = args.apCount;
    this.playCount = args.playCount;
    this.updateAt = args.updateAt;
    this.nicePlayRank = args.nicePlayRank;
  }

  public static empty(args: {
    musicId: string;
    difficultyType: ChartDifficultyType;
  }): ScoreData {
    return new ScoreData({
      ...args,
      achievementRate: 0,
      maxCombo: 0,
      comboRank: 0,
      likes: 0,
      likesRank: 0,
      clearStatus: ClearStatus.NO_PLAY,
      clearCount: 0,
      fcCount: 0,
      apCount: 0,
      playCount: 0,
      updateAt: fromUnixTime(0),
      nicePlayRank: 0,
    });
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
