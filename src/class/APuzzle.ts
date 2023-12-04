import { CoreLogChannel, CoreLogger } from '@grandlinex/core';
import * as fs from 'fs';
import * as Path from 'path';
import Timing from './Timing';

export default abstract class APuzzle<A> extends CoreLogChannel {
  root: string;

  name: string;

  timing: Timing;

  protected constructor({
    logger,
    root,
    name,
  }: {
    logger?: CoreLogger;
    root: string;
    name: string;
  }) {
    super(name, logger || null);
    this.root = root;
    this.name = name;
    this.timing = new Timing();
  }

  protected abstract run(): Promise<A>;

  async start(): Promise<A> {
    this.timing = new Timing();
    return this.timing.startFunc('full', () => this.run());
  }

  protected loadResource(): string {
    return this.timing.startFuncSync('read-file', () =>
      fs.readFileSync(Path.join(this.root, 'res.txt'), 'utf8'),
    );
  }

  protected loadResourceLines(withEmptyLines = false): string[] {
    const lines = this.loadResource().split('\n');
    if (!withEmptyLines) {
      return lines.filter((x) => x !== '');
    }
    return lines;
  }
}
