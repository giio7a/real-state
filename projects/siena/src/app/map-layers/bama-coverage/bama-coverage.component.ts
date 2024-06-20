import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IsochroneLocationArgs, NgxMaplibreIsochroneLayerDirective} from '@nidiro/ngx-map-isochrone-layer';
import {NgxMapLibreCoreComponent} from '@nidiro/ngx-map-core';
import BAMA_LOCATIONS from '../../data/bama_locations.json';
import {GeoJSONSourceSpecification, SourceSpecification} from '@maplibre/maplibre-gl-style-spec';

@Component({
  selector: 'sin-bama-coverage',
  standalone: true,
  imports: [NgxMaplibreIsochroneLayerDirective],
  templateUrl: './bama-coverage.component.html',
  styleUrl: './bama-coverage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BamaCoverageComponent implements OnInit, OnDestroy {
  @Input() ngxMapCore: NgxMapLibreCoreComponent;
  @Input() proximityByWalkingTimeInSeconds = 60;
  @Input() coverageAreaColor = '0000ff';

  locationsForIsochrones: IsochroneLocationArgs[] = [];

  private readonly sourceId = 'siena-bama-locations';
  private readonly layerId = 'siena-bama-locations__layer';

  ngOnInit() {
    this.loadBamaLocations();
  }

  ngOnDestroy() {
    this.ngxMapCore.mapCore.removeLayer(this.layerId);
    this.ngxMapCore.mapCore.removeSource(this.sourceId);
  }

  finishedLoadingAll() {
    console.log('\x1B[46;97m>>>>>> Bama ready');
  }

  private loadBamaLocations() {
    this.renderBamaLocations();
    this.renderBamaCoverage();
  }

  private renderBamaLocations() {
    const data: GeoJSONSourceSpecification['data'] = {
      type: 'FeatureCollection',
      features: BAMA_LOCATIONS.map((location) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
          },
          properties: {
            name: location.title,
          },
        };
      }),
    };
    const source: SourceSpecification = {
      type: 'geojson',
      data,
    };
    this.ngxMapCore.mapCore.addSource(this.sourceId, source);
    this.ngxMapCore.insertLayer({
      id: this.layerId,
      source: this.sourceId,
      type: 'circle',
      paint: {
        'circle-radius': 5,
        'circle-color': `#${this.coverageAreaColor}`,
      },
    });
  }

  private renderBamaCoverage() {
    this.locationsForIsochrones = BAMA_LOCATIONS.map((location) => {
      return {
        location: {
          lat: location.lat,
          lon: location.lng,
        },
        costType: 'pedestrian',
        intervals: [{seconds: this.proximityByWalkingTimeInSeconds, color: this.coverageAreaColor}],
      };
    });
  }
}
