import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part02 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_04_part_02',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();

    const winArray: number[] = [];
    const countArray: number[] = [];
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
            counter += 1;
          }
        });

      this.verbose(Array.from(winningSet));
      this.warn(`Count ${counter}`);
      winArray.push(counter);
      countArray.push(1);
    });

    this.warn(winArray);
    // Go throw card by card
    for (let index = 0; index < countArray.length; index++) {
      // Repeat the action by card count
      for (let repeat = 0; repeat < countArray[index]; repeat++) {
        const winCount = winArray[index];
        // Increase the count of the following card by the size of winning numbers
        for (let i = 0; i < winCount; i++) {
          countArray[index + i + 1] += 1;
        }
      }
    }
    this.warn(countArray);
    return countArray.reduce((a, b) => a + b, 0);
  }
}
