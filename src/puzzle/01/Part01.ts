import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';

export default class Part01 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_01_part_01',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResourceLines();

    return data
      .map((line) => {
        const chars = line.replace(/[^0-9]/g, '');
        return parseInt(chars[0] + chars[chars.length - 1], 10);
      })
      .reduce((acc, cur) => acc + cur, 0);
  }
}
