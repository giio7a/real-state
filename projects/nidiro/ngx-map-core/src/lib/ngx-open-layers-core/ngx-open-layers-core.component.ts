import {ChangeDetectionStrategy, Component, ElementRef, input, OnInit, output, ViewChild} from '@angular/core';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {INgxMapCore, NgxMapCoreCommon} from '../architecture/ngx-map-core';
import {ViewOptions} from 'ol/View';
import {Layer} from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {MapCoreSettings} from '../settings/map-core-settings';
import {Extent} from 'ol/extent';

@Component({
  selector: 'nid-open-layers-core',
  standalone: true,
  imports: [],
  templateUrl: './ngx-open-layers-core.component.html',
  styleUrl: './ngx-open-layers-core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxOpenLayersCoreComponent extends NgxMapCoreCommon<Map> implements INgxMapCore<Map>, OnInit {
  /**
   * Extent in {@link ProjectionSettings.SPHERICAL_MERCATOR} to limit max zoom and pan in map.
   * If provided initial position won't take effect.
   */
  extentToShow = input<Extent>(MapCoreSettings.WHOLE_WORLD_EXTENT);
  cursorInMap: boolean = false;

  mapLoaded = output<Map>();
  @ViewChild('olMap', {static: true}) olMapElement!: ElementRef<HTMLDivElement>;

  constructor() {
    super();
    console.log('\x1B[46;30m Core');
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override initMap() {
    const initialPosition = this.initialPosition || this.defaultInitialPosition!;
    const viewOptions: ViewOptions = {
      center: fromLonLat([initialPosition?.longitude, initialPosition?.latitude]),
      zoom: getValidLowerZoomLevelFrom(initialPosition.zoom),
      minZoom: MIN_OL_ZOOM,
      enableRotation: false, // Important! Our performance improvements need to be reviewed before allowing map rotation.
      extent: this.extentToShow(),
    };
    this.mapCore = new Map({
      target: this.olMapElement.nativeElement,
      view: new View(viewOptions),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });
    this.mapLoaded.emit(this.mapCore);
  }

  override insertLayer(layer: Layer) {
    this.mapCore.addLayer(layer);
  }
}

const MIN_OL_ZOOM = 3;
const getValidLowerZoomLevelFrom = (zoomLevel: number): number => {
  return zoomLevel < MIN_OL_ZOOM ? MIN_OL_ZOOM : zoomLevel;
};
