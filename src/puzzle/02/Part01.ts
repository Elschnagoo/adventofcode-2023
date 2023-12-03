import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part01 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_02_part_01',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();

    let counter = 0;

    data.forEach((line) => {
      const [g, q] = line.split(': ');
      const gameNum = parseInt(g.substring(5), 10);
      let valid = true;
      this.debug(gameNum);
      q.split(';').forEach((game) => {
        this.verbose(game);
        game
          .split(',')
          .map((e) => e.trim())
          .forEach((round) => {
            this.warn(round);
            if (!valid) return;

            const [value, color] = round.split(' ');
            const num = parseInt(value, 10);
            let max;
            switch (color) {
              case 'red':
                max = 12;
                break;
              case 'green':
                max = 13;
                break;
              case 'blue':
                max = 14;
                break;
              default:
                throw new Error(`Unknown color ${color}`);
            }
            if (num > max) {
              valid = false;
            }
          });
      });
      this.info(gameNum, valid);
      if (valid) {
        counter += gameNum;
      }
    });

    return counter;
  }
}
