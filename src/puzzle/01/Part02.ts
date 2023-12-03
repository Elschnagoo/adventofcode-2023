import { CMap, CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part02 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_01_part_02',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();
    const list: [string, number][] = [
      ['one', 1],
      ['two', 2],
      ['three', 3],
      ['four', 4],
      ['five', 5],
      ['six', 6],
      ['seven', 7],
      ['eight', 8],
      ['nine', 9],
    ];

    return data
      .map((line) => {
        const map = new CMap<number, number>();
        this.debug(line);
        // Add digit numbers to map
        line.split('').forEach((char, index) => {
          if (/^[0-9]$/gm.test(char)) {
            map.set(index, parseInt(char, 10));
          }
        });
        // Add string numbers to map
        list.forEach(([name, value]) => {
          for (let i = 0; i < line.length; i++) {
            const index = line.indexOf(name, i);
            if (index !== -1) {
              map.set(index, value);
            }
          }
        });

        const sorted = Array.from(map.entries())
          .sort((a, b) => a[0] - b[0])
          .map((el) => el[1]);

        this.verbose([sorted[0], sorted[sorted.length - 1]]);
        return parseInt(`${sorted[0]}${sorted[sorted.length - 1]}`, 10);
      })
      .reduce((acc, cur) => acc + cur, 0);
  }
}
