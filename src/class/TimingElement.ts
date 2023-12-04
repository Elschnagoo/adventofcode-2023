export type IElement = {
  completeElement: (e: TimingElement) => void;
};

export default class TimingElement {
  private el: IElement;

  readonly chanel: string;

  private readonly start: number;

  private end: number;

  constructor(el: IElement, chanel: string) {
    this.el = el;
    this.chanel = chanel;
    this.start = new Date().getTime();
    this.end = -1;
  }

  stop() {
    if (this.end === -1) {
      this.end = new Date().getTime();
      this.el.completeElement(this);
    }
  }

  getDuration() {
    if (this.end === -1) {
      return 0;
    }
    return this.end - this.start;
  }
}
