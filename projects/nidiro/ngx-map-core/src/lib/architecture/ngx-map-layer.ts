import {Directive, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {INgxMapCore} from './ngx-map-core';

@Directive()
export abstract class NgxMapLayer<MapImplementation> implements OnChanges, OnDestroy {
  @Input() ngxMapCore!: INgxMapCore<MapImplementation>; // Mandatory!
  @Input() visible = true;

  abstract getLayerId(): string;

  protected abstract setLayerVisibility(isVisible: boolean): void;

  protected abstract removeSelfLayer(): void;

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
    this.removeSelfLayer();
  }
}
