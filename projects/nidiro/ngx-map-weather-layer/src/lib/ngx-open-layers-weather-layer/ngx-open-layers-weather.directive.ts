import {Directive} from '@angular/core';
import {NgxMapLayer} from '@nidiro/ngx-map-core'

@Directive({
  selector: 'nidOpenLayersWeatherLayer',
})
export class NgxOpenLayersWeatherDirective extends NgxMapLayer {

  override getLayerId() {
    return 'weather-deck.js'
  }

  override setLayerVisibility() {
    // TODO Enrique: Implement
  }

  override removeLayer() {
    // TODO Enrique: Implement
  }

  constructor() {
    super();
    console.log('\x1B[46;30m ', 1212312);
  }
}
