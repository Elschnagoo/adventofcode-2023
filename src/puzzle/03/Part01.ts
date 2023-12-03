import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part01 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_03_part_01',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();

    const sMap: number[][] = [];
    const nMap: [number, number][][] = [];

    data.forEach((line) => {
      const symbols: number[] = [];
      const numbers: [number, number][] = [];
      this.verbose(line);
      const dx = line.replace(/[0-9]/g, 'N').replace(/[^0-9N.\n\r]/g, 'S');

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
        const sameLine = !!sMap[y].find(
          (s) => s === start - 1 || s === end + 1,
        );

        const lastLine =
          y > 0
            ? !!sMap[y - 1].find((s) => s >= start - 1 && s <= end + 1)
            : false;

        const nextLine =
          y < nMap.length - 1
            ? !!sMap[y + 1].find((s) => s >= start - 1 && s <= end + 1)
            : false;

        if (sameLine || lastLine || nextLine) {
          const numString = data[y].substring(start, end + 1);
          sum += parseInt(numString, 10);
        }
      });
    });

    return sum;
  }
}
