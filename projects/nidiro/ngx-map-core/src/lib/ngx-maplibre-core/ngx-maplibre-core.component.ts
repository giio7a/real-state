import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LayerComponent, MapComponent} from '@maplibre/ngx-maplibre-gl';
import {INgxMapCore, NgxMapCoreCommon} from '../architecture/ngx-map-core';
import {LayerSpecification, Map} from 'maplibre-gl';

@Component({
  selector: 'nid-maplibre-core',
  standalone: true,
  imports: [MapComponent, LayerComponent],
  templateUrl: './ngx-maplibre-core.component.html',
  styleUrl: './ngx-maplibre-core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMapLibreCoreComponent extends NgxMapCoreCommon<Map> implements INgxMapCore<Map>, OnInit {

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
