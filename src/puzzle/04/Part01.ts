import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part01 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_04_part_01',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();

    let sum = 0;
    data.forEach((line) => {
      this.debug(line);
      let counter = 0;
      const [, card] = line.split(': ');

      const [win, numbers] = card.split('|');

      const winningSet = new Set<number>();

      win
        .trim()
        .split(' ')
        .filter((x) => x !== '')
        .forEach((cur) => {
          winningSet.add(parseInt(cur.trim(), 10));
        });

      numbers
        .trim()
        .split(' ')
        .filter((x) => x !== '')
        .map((e) => parseInt(e.trim(), 10))
        .forEach((cur) => {
          if (winningSet.has(cur)) {
            if (counter === 0) {
              counter += 1;
            } else {
              counter *= 2;
            }
          }
        });

      this.verbose(Array.from(winningSet));
      this.warn(`Count ${counter}`);
      sum += counter;
      this.warn(`sum ${sum}`);
    });

    return sum;
  }
}
