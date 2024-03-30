import {Directive, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';

@Directive()
export abstract class NgxMapLayer implements OnChanges, OnDestroy {
  @Input() visible = true;

  abstract getLayerId(): string;

  protected abstract setLayerVisibility(isVisible: boolean): void;

  protected abstract removeLayer(): void;

  constructor() {
  }

  get isVisible(): boolean {
    return this.visible;
  }

  ngOnChanges(changes: SimpleChanges) {
    const visibleChange = changes['visible'];
    if (visibleChange) {
      console.info(`[${this.getLayerId()}] Change visibility (${visibleChange.currentValue})`);
      this.setLayerVisibility(visibleChange.currentValue);
    }
  }

  ngOnDestroy() {
    this.removeLayer();
  }
}
