import {Directive, Inject, OnInit} from '@angular/core';
import {BaseWeatherLayer} from '../common/base-weather-layer';
import {IControl, Map} from 'maplibre-gl';
import {NGX_WEATHER_LAYER_CONFIG, WeatherLayersConfigToken} from '../common/injection-token';
import {Deck} from '@deck.gl/core';
import {MapboxOverlay} from '@deck.gl/mapbox';

@Directive({
  selector: '[nidMapLibreWeatherLayer]',
  standalone: true,
})
export class NgxMapLibreWeatherLayerDirective extends BaseWeatherLayer<Map> implements OnInit {
  override getLayerId(): string {
    return 'weather-maplibre-' + Date.now();
  }

  override setLayerVisibility() {
    // TODO Enrique: Implement
  }

  override removeSelfLayer() {
    this.ngxMapCore.mapCore.removeControl(this.deckInstance as unknown as IControl);
  }

  constructor(@Inject(NGX_WEATHER_LAYER_CONFIG) weatherLayerConfig: WeatherLayersConfigToken) {
    super(weatherLayerConfig);
  }

  ngOnInit(): void {
    const deckLayer = new MapboxOverlay({
      interleaved: true,
      layers: [],
    });
    this.deckInstance = deckLayer as unknown as Deck; // The only thing that we need is the setProps.
    this.initMapboxLayer(deckLayer);
  }

  async initMapboxLayer(layer: MapboxOverlay) {
    this.ngxMapCore.mapCore.addControl(layer as unknown as IControl);
    await super.initLayer();
  }
}
