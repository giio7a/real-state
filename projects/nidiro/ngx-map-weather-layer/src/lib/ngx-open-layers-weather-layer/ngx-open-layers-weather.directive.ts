import {Directive, OnInit} from '@angular/core';
import {NgxMapLayer} from '@nidiro/ngx-map-core'
import {Layer} from 'ol/layer';
import {toLonLat} from 'ol/proj';
import {Map} from 'ol'
import {Deck} from '@deck.gl/core/typed';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers/typed';

@Directive({
  selector: '[nidOpenLayersWeatherLayer]',
  standalone: true,
})
export class NgxOpenLayersWeatherDirective extends NgxMapLayer<Map> implements OnInit {

  override getLayerId() {
    return 'weather-deck.js'
  }

  override setLayerVisibility() {
    // TODO Enrique: Implement
  }

  override removeSelfLayer() {
    // TODO Enrique: Implement
  }

  constructor() {
    super();
    console.log('\x1B[46;30m Weather Directive');
  }

  ngOnInit() {
    this.initLayer()
  }

  // TODO Enrique: Dummy airports DeckGL layer
  private initLayer() {
    const AIR_PORTS =
      'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

    const deck = new Deck({
      initialViewState: {longitude: 0, latitude: 0, zoom: 1},
      controller: false,
      parent: this.ngxMapCore.mapCore.getTargetElement() as HTMLDivElement,
      style: {pointerEvents: 'none', zIndex: '1', top: '0'},
      layers: [
        new GeoJsonLayer({
          id: 'airports',
          data: AIR_PORTS,
          // Styles
          filled: true,
          pointRadiusMinPixels: 2,
          pointRadiusScale: 2000,
          getPointRadius: f => 11 - f.properties?.['scalerank'],
          getFillColor: [200, 0, 80, 180],
          // Interactive props
          pickable: true,
          autoHighlight: true,
          onClick: info =>
            // eslint-disable-next-line
            info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
        }),
        new ArcLayer({
          id: 'arcs',
          data: AIR_PORTS,
          dataTransform: (d: any) => d.features.filter((f: any) => f.properties.scalerank < 4),
          // Styles
          getSourcePosition: f => [-0.4531566, 51.4709959], // London
          getTargetPosition: f => f.geometry.coordinates,
          getSourceColor: [0, 128, 200],
          getTargetColor: [200, 0, 80],
          getWidth: 1
        })
      ]
    });

    // Sync deck view with OL view
    const deckLayer = new Layer({
      // @ts-ignore -  TODO Enrique: Confirm
      render: ({size, viewState}) => {
        const [width, height] = size;
        const [longitude, latitude] = toLonLat(viewState.center);
        const zoom = viewState.zoom - 1;
        const bearing = (-viewState.rotation * 180) / Math.PI;
        const deckViewState = {bearing, longitude, latitude, zoom};
        deck.setProps({width, height, viewState: deckViewState});
        deck.redraw();
        // return this.mapCore.nativeElement
      }
    });

    this.ngxMapCore.insertLayer(deckLayer)
  }

}
