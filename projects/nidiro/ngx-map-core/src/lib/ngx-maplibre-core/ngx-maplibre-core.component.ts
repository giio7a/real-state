import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MapComponent} from '@maplibre/ngx-maplibre-gl';
import {INgxMapCore, NgxMapCoreCommon} from '../architecture/ngx-map-core';
import {LayerSpecification, Map, MapOptions} from 'maplibre-gl';

@Component({
  selector: 'nid-maplibre-core',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './ngx-maplibre-core.component.html',
  styleUrl: './ngx-maplibre-core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMapLibreCoreComponent extends NgxMapCoreCommon<Map> implements INgxMapCore<Map>, OnInit {
  @Input() set initialMapOptions(value: MapOptions) {
    this._initialOptions.zoom = value.zoom || 0;
    this._initialOptions.center = value.center || [0, 0]
  }

  /**
   * From [OpenStreetMap.org](https://www.openstreetmap.org/)
   */
  defaultMapStyle: MapOptions['style'] = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19
      }
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm"
      }
    ]
  }


  private _initialOptions: MapOptions = {
    container: null,
    style: ''
  }

  get initialMapOptions() {
    return this._initialOptions
  }

  get zoom() {
    return this.initialPosition ? this.initialPosition.zoom : this.initialMapOptions.zoom || 0
  }

  get center() {
    return this.initialPosition ? [this.initialPosition.longitude, this.initialPosition.latitude] as [number, number] : this.initialMapOptions.center
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override initMap() {
    // No need. It's passed by MapComponent.mapLoad
  }

  override insertLayer(layer: LayerSpecification) {
    console.log('\x1B[46;30m  insert', layer);
  }
}
