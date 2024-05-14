import {Directive, Inject, OnInit} from '@angular/core';
import {Layer} from 'ol/layer';
import {toLonLat} from 'ol/proj';
import {Map} from 'ol'
import {Deck, MapView} from '@deck.gl/core/typed';
import {BASEMAP_RASTER_STYLE_URL} from './basemap';
import {XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {Control} from 'ol/control';
import {NGX_WEATHER_LAYER_CONFIG, WeatherLayersConfigToken} from '../common/injection-token';
import {BaseWeatherLayer} from '../common/base-weather-layer';

@Directive({
  selector: '[nidOpenLayersWeatherLayer]',
  standalone: true,
})
export class NgxOpenLayersWeatherDirective extends BaseWeatherLayer<Map> implements OnInit {
  override getLayerId() {
    return 'weather-openLayers-' + Date.now();
  }

  override setLayerVisibility() {
    // TODO Enrique: Implement
  }

  override removeSelfLayer() {
    // TODO Enrique: Implement
  }

  constructor(@Inject(NGX_WEATHER_LAYER_CONFIG) weatherLayerConfig: WeatherLayersConfigToken) {
    super(weatherLayerConfig);
  }

  ngOnInit() {
    // TODO Enrique: This has to be moved to a base layer component!
    this.ngxMapCore.insertLayer(new TileLayer({source: new XYZ({url: BASEMAP_RASTER_STYLE_URL}), maxZoom: 22}));

    /**
     * overlaid deck.gl
     * see https://github.com/visgl/deck.gl/blob/8.9-release/examples/get-started/pure-js/openlayers/app.js
     * updated to support picking
     */
      // TODO Enrique: CONFIRM - Using new div?
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';

    // Because it is the OpenLayers implementation, we are going to create its own instance of Deck.gl.
    this.deckInstance = new Deck({
      parent: element,
      initialViewState: {longitude: 0, latitude: 0, zoom: 1}, // This is not meaningful since the render function would immediately set something else
      controller: false,
      views: [
        new MapView({repeat: true}),
      ],
      layers: [],
    });
    this.initLayer();
  }

  override async initLayer() {
    await super.initLayer();

    const element = this.deckInstance.props.parent;
    this.ngxMapCore.mapCore.addControl(new Control({element}));
    this.ngxMapCore.insertLayer(new Layer({
      render: ({size, viewState}) => {
        const [width, height] = size;
        const [longitude, latitude] = toLonLat(viewState.center);
        const zoom = viewState.zoom - 1;
        const bearing = (-viewState.rotation * 180) / Math.PI;
        const deckViewState = {bearing, longitude, latitude, zoom};
        this.deckInstance.setProps({width, height, viewState: deckViewState});
        this.deckInstance.redraw();
        return element;
      }
    }));
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointerdown', event => {
      this.deckInstance._onPointerDown({
        // @ts-ignore
        type: event.type,
        srcEvent: event,
        offsetCenter: {x: event.offsetX / window.devicePixelRatio, y: event.offsetY / window.devicePixelRatio},
        leftButton: event.buttons === 1,
        rightButton: event.buttons === 2
      });
    });
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointermove', event => {
      this.deckInstance._onPointerMove({
        // @ts-ignore
        type: event.type,
        srcEvent: event,
        offsetCenter: {x: event.offsetX / window.devicePixelRatio, y: event.offsetY / window.devicePixelRatio},
        leftButton: event.buttons === 1,
        rightButton: event.buttons === 2
      });
    });
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointerleave', event => {
      this.deckInstance._onPointerMove({
        // @ts-ignore
        type: event.type,
        srcEvent: event
      });
    });
    return this.refreshLayer();
  }
}
