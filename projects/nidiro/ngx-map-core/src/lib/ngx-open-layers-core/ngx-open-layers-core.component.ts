import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {INgxMapCore, NgxMapCoreCommon} from '../architecture/ngx-map-core';
import {ViewOptions} from 'ol/View';

@Component({
  selector: 'nid-open-layers-core',
  standalone: true,
  imports: [],
  templateUrl: './ngx-open-layers-core.component.html',
  styleUrl: './ngx-open-layers-core.component.scss'
})
export class NgxOpenLayersCoreComponent extends NgxMapCoreCommon<Map> implements INgxMapCore<Map>, OnInit {
  cursorInMap: boolean = false;

  @ViewChild('olMap', {static: true}) olMapElement!: ElementRef<HTMLDivElement>;

  constructor() {
    super()
    console.log('\x1B[46;30m ', 2222);
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
    };
    this.mapCore = new Map({
      target: this.olMapElement.nativeElement,
      view: new View(viewOptions)
    })
  }
}

const MIN_OL_ZOOM = 3;
const getValidLowerZoomLevelFrom = (zoomLevel: number): number => {
  return zoomLevel < MIN_OL_ZOOM ? MIN_OL_ZOOM : zoomLevel;
};
