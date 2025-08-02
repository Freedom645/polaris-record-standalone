export function normalizeArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function chunkArray<T>(array: T[], size: number): IterableIterator<T[]> {
  function* generator(): IterableIterator<T[]> {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error("分割サイズは正の整数でなければなりません。");
    }

    for (let i = 0; i < array.length; i += size) {
      yield array.slice(i, i + size);
    }
  }

  return generator();
}

export function range(
  start: number,
  stop?: number,
  step: number = 1
): IterableIterator<number> {
  function* generator(): IterableIterator<number> {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    if (step === 0) {
      throw new Error("stepは0以外でなければなりません。");
    }

    const increasing = step > 0;

    if (increasing) {
      for (let i = start; i < stop; i += step) {
        yield i;
      }
    } else {
      for (let i = start; i > stop; i += step) {
        yield i;
      }
    }
  }

  return generator();
}
