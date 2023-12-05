import { CoreLogger } from '@grandlinex/core';
import { Worker } from 'worker_threads';
import * as path from 'path';
import APuzzle from '../../class/APuzzle';
import { extractDataMap } from './utils';

function sizeOf(arr: [number, number][]) {
  return arr.reduce((a, [, b]) => a + b, 0);
}
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

    const threadCount = 12;

    const dataMaps = block.slice(1).map((x) => extractDataMap(x));

    const options: [number, number][] = [];

    // Brute force
    for (let i = 0; i < seeds.length; i += 2) {
      options.push([seeds[i], seeds[i + 1]]);
    }

    const max = sizeOf(options);
    options.forEach((o) => this.verbose(o[1], Math.trunc((o[1] / max) * 100)));

    const loadMax = Math.ceil(max / threadCount);
    this.debug(loadMax);

    const workLoad = new Map<number, [number, number][]>();

    let loopCounter = 0;

    for (let count = 0; count < threadCount; count++) {
      const option: [number, number][] = [];

      while (
        loopCounter !== max &&
        sizeOf(option) < loadMax &&
        options.length > 0
      ) {
        const [s, c] = options.pop()!;
        if (c + sizeOf(option) <= loadMax) {
          option.push([s, c]);
          loopCounter += c;
        } else {
          const cut = loadMax - sizeOf(option);
          option.push([s, cut]);
          options.push([s + cut, c - cut]);
        }
      }
      workLoad.set(count, option);
    }

    workLoad.forEach((value, key) => {
      this.warn(key, value, sizeOf(value), loadMax - sizeOf(value));
    });

    const threads = new Set<Worker>();

    return new Promise((resolve, reject) => {
      let low = 0;
      workLoad.forEach((o, index) => {
        this.debug(`Thread starting #${index + 1}`);

        const thread = new Worker(path.join(__dirname, 'WorkerScript.js'), {
          workerData: {
            dataMaps,
            load: o,
            index,
          },
        });
        thread.on('error', (err) => {
          reject();
          throw err;
        });
        thread.on('exit', () => {
          threads.delete(thread);
          this.debug(`Thread exiting #${index} -- ${threads.size} running...`);
          if (threads.size === 0) {
            resolve(low);
          }
        });
        thread.on('message', (msg: number) => {
          this.verbose(`#${index}`, msg);
          if (low === 0 || msg < low) {
            low = msg;
          }
        });
        threads.add(thread);
      });
    });
  }
}
