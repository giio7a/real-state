import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  IsochroneLocationArgs,
  NGX_MAPLIBRE_ISOCHRONE_DIRECTIVES,
  NgxMaplibreIsochroneLayerDirective,
} from '@nidiro/ngx-map-isochrone-layer';
import {NgxMapLibreCoreComponent} from '@nidiro/ngx-map-core';
import {DENUEApiService, DENUESearchResponseItem} from '../../data/denue-api.service';
import {Subscription} from 'rxjs';
import {GeoJSONSourceSpecification, SourceSpecification} from '@maplibre/maplibre-gl-style-spec';

@Component({
  selector: 'sin-oxxo-coverage',
  standalone: true,
  imports: [NGX_MAPLIBRE_ISOCHRONE_DIRECTIVES as [typeof NgxMaplibreIsochroneLayerDirective]],
  templateUrl: './oxxo-coverage.component.html',
  styleUrl: './oxxo-coverage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxxoCoverageComponent implements OnInit, OnDestroy {
  @Input() ngxMapCore: NgxMapLibreCoreComponent;
  @Input() proximityByWalkingTimeInSeconds = 60;
  @Input() coverageAreaColor = 'ff0000';

  location: {stateId: string; municipalityId: string} = {
    stateId: '30', // Veracruz
    municipalityId: '039', // Coatzacoalcos
  };

  locationsForIsochrones: IsochroneLocationArgs[] = [];

  private readonly sourceId = 'siena-oxxo-locations';
  private readonly layerId = 'siena-oxxo-locations__layer';
  private subscription = new Subscription();

  constructor(private denueApiService: DENUEApiService) {}

  ngOnInit() {
    this.loadOxxoLocations();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngxMapCore.mapCore.removeLayer(this.layerId);
    this.ngxMapCore.mapCore.removeSource(this.sourceId);
  }

  finishedLoadingAll() {
    // console.log('\x1B[46;30m Oxxos ready',);
  }

  private loadOxxoLocations() {
    const subscription = this.denueApiService
      .buscarAreaAct({
        stateId: this.location.stateId,
        municipalityId: this.location.municipalityId,
        classId: '462112',
        name: 'OXXO',
        initialRecord: 1,
        lastRecord: 50,
      })
      .subscribe((response) => {
        this.renderOxxoLocations(response);
        this.renderOxxoCoverage(response);
      });
    this.subscription.add(subscription);
  }

  private renderOxxoLocations(oxxoLocations: DENUESearchResponseItem[]) {
    const data: GeoJSONSourceSpecification['data'] = {
      type: 'FeatureCollection',
      features: oxxoLocations.map((location) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [+location.Longitud, +location.Latitud],
          },
          properties: {
            name: location.Nombre,
            // address: location.,
            // postalCode: location.CodigoPostal,
            phone: location.Telefono,
            // id: location.id
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

  private renderOxxoCoverage(oxxoLocations: DENUESearchResponseItem[]) {
    this.locationsForIsochrones = oxxoLocations.map((location) => {
      return {
        location: {lat: +location.Latitud, lon: +location.Longitud},
        costType: 'pedestrian',
        intervals: [{seconds: this.proximityByWalkingTimeInSeconds, color: this.coverageAreaColor}],
      };
    });
  }
}
