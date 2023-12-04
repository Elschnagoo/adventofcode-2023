import { CMap } from '@grandlinex/core';
import TimingElement, { IElement } from './TimingElement';

export default class Timing implements IElement {
  map: CMap<string, TimingElement[]>;

  constructor() {
    this.map = new CMap();
  }

  start(chanel: string) {
    return new TimingElement(this, chanel);
  }

  async startFunc<T>(chanel: string, fc: () => Promise<T>): Promise<T> {
    const el = new TimingElement(this, chanel);
    const content = await fc();
    el.stop();
    return content;
  }

  startFuncSync<T>(chanel: string, fc: () => T): T {
    const el = new TimingElement(this, chanel);
    const content = fc();
    el.stop();
    return content;
  }

  completeElement(e: TimingElement) {
    const cur = this.map.get(e.chanel) ?? [];
    cur.push(e);
    this.map.set(e.chanel, cur);
  }

  getStats() {
    return this.map
      .map(
        (value, key) =>
          `${key}: ${value
            .map((e) => e.getDuration())
            .reduce((a, b) => a + b, 0)}ms`,
      )
      .join(', ');
  }
}
