import { CMap, CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part02 extends APuzzle<number> {
  private map: CMap<string, number[]>;

  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_03_part_02',
    });
    this.map = new CMap<string, number[]>();
  }

  private appendNumber(line: number, index: number, val: number) {
    const key = `${line}-${index}`;
    if (this.map.has(key)) {
      const cur = this.map.get(key)!;
      cur.push(val);
      this.map.set(key, cur);
    } else {
      this.map.set(key, [val]);
    }
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();
    this.map = new CMap<string, number[]>();

    const sMap: number[][] = [];
    const nMap: [number, number][][] = [];

    data.forEach((line) => {
      const symbols: number[] = [];
      const numbers: [number, number][] = [];
      this.verbose(line);
      const dx = line
        .replace(/[0-9]/g, 'N')
        .replace(/\*/g, 'S')
        .replace(/[^0-9NS.\n\r]/g, '.');

      let lastWasNumber = -1;
      dx.split('').forEach((e, index) => {
        if (e === 'S') {
          symbols.push(index);
        }
        if (e === 'N') {
          if (lastWasNumber === -1) {
            lastWasNumber = index;
          }
        } else if (lastWasNumber !== -1) {
          numbers.push([lastWasNumber, index - 1]);
          lastWasNumber = -1;
        }
        if (index === dx.length - 1 && lastWasNumber !== -1) {
          numbers.push([lastWasNumber, index]);
        }
      });

      this.debug(dx);

      this.warn(symbols);
      sMap.push(symbols);

      this.warn(numbers);
      nMap.push(numbers);
    });

    let sum = 0;

    nMap.forEach((line, y) => {
      line.forEach(([start, end]) => {
        const numString = data[y].substring(start, end + 1);
        const int = parseInt(numString, 10);

        const sameLine = sMap[y].findIndex(
          (s) => s === start - 1 || s === end + 1,
        );

        const lastLine =
          y > 0
            ? sMap[y - 1].findIndex((s) => s >= start - 1 && s <= end + 1)
            : -1;

        const nextLine =
          y < nMap.length - 1
            ? sMap[y + 1].findIndex((s) => s >= start - 1 && s <= end + 1)
            : -1;

        if (sameLine >= 0) {
          this.appendNumber(y, sameLine, int);
        }
        if (lastLine >= 0) {
          this.appendNumber(y - 1, lastLine, int);
        }
        if (nextLine >= 0) {
          this.appendNumber(y + 1, nextLine, int);
        }
      });
    });

    this.map.forEach((value, key) => {
      this.warn(key, value);
      if (value.length === 2) {
        const [f, s] = value;
        sum += f * s;
      }
    });

    return sum;
  }
}
