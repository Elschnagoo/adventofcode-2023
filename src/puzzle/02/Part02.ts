import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part02 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_02_part_02',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();

    return data
      .map((line) => {
        const [g, q] = line.split(': ');
        const gameNum = parseInt(g.substring(5), 10);
        let red = 0;
        let blue = 0;
        let green = 0;

        this.debug(gameNum);
        q.split(';').forEach((game) => {
          this.verbose(game);
          game
            .split(',')
            .map((e) => e.trim())
            .forEach((round) => {
              this.warn(round);
              const [value, color] = round.split(' ');
              const num = parseInt(value, 10);
              switch (color) {
                case 'red':
                  if (num > red) {
                    red = num;
                  }
                  break;
                case 'green':
                  if (num > green) {
                    green = num;
                  }
                  break;
                case 'blue':
                  if (num > blue) {
                    blue = num;
                  }
                  break;
                default:
                  throw new Error(`Unknown color ${color}`);
              }
            });
        });
        this.info(gameNum, red * blue * green);

        return red * blue * green;
      })
      .reduce((acc, cur) => acc + cur, 0);
  }
}
