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

    // Brute force
    for (let i = 0; i < seeds.length; i += 2) {
      this.debug(`range: ${i / 2 + 1}/${seeds.length / 2}`);

      const end = seeds[i] + seeds[i + 1];

      let c = 0;
      let m = 1;
      let lastP = 0;
      let curP = 0;

      for (let j = seeds[i]; j < end; j++) {
        c = j - seeds[i];
        m = end - seeds[i];
        curP = Math.trunc((c / m) * 100);
        if (curP !== lastP) {
          lastP = curP;
          this.verbose(`${curP}% [${c}/${m}]`);
        }

        let cur = j;
        for (const map of dataMaps) {
          cur = resolveMappedValue(cur, map);
        }
        if (low === 0 || cur < low) {
          low = cur;
        }
      }
    }

    return low;
  }
}
