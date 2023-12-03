import { CoreLogChannel, CoreLogger } from '@grandlinex/core';
import * as fs from 'fs';
import * as Path from 'path';

export default abstract class APuzzle<A> extends CoreLogChannel {
  root: string;

  name: string;

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
  }

  abstract run(): Promise<A>;

  protected loadResource(): string {
    return fs.readFileSync(Path.join(this.root, 'res.txt'), 'utf8');
  }

  protected loadResourceLines(withEmptyLines = false): string[] {
    const lines = fs
      .readFileSync(Path.join(this.root, 'res.txt'), 'utf8')
      .split('\n');
    if (!withEmptyLines) {
      return lines.filter((x) => x !== '');
    }
    return lines;
  }
}
