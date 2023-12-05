import { CoreLogger } from '@grandlinex/core';
import APuzzle from '../../class/APuzzle';
import { extractDataMap, resolveMappedValue } from './utils';

export default class Part01 extends APuzzle<number> {
  constructor(logger?: CoreLogger) {
    super({
      logger,
      root: __dirname,
      name: 'day_05_part_01',
    });
  }

  async run(): Promise<number> {
    const data = this.loadResource();

    const block = data.split('\n\n');

    const seeds = block[0]
      .split(': ')[1]
      .split(' ')
      .map((e) => parseInt(e, 10));

    this.verbose(seeds);

    const dataMaps = block.slice(1).map((x) => extractDataMap(x));

    let low = 0;

    seeds.forEach((seed) => {
      this.debug(`seed: ${seed}`);
      let last = seed;
      let cur = seed;
      for (const map of dataMaps) {
        last = cur;
        cur = resolveMappedValue(cur, map);
        this.verbose(last, '->', cur, map[0].type);
      }
      if (low === 0 || cur < low) {
        low = cur;
      }
    });

    return low;
  }
}
