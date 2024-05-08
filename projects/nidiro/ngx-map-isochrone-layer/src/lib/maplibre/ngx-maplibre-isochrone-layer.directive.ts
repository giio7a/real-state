import {Directive, Inject, Input, OnDestroy} from '@angular/core';
import {NgxMapLayer, VALHALLA_API_CONFIG, ValhallaApiConfigToken} from '@nidiro/ngx-map-core';
import {GeoJSONSource, Map} from 'maplibre-gl';
import {Valhalla, ValhallaCostingType, ValhallaIsochrones, ValhallaLocation} from '@routingjs/valhalla'
import {concatMap, debounceTime, delay, filter, from, iif, of, Subject, Subscription, switchMap, tap} from 'rxjs';

export interface IsochroneLocationArgs {
  location: ValhallaLocation;
  costType: ValhallaCostingType;
  intervals: {seconds: number; color: string}[];
}

@Directive({
  selector: '[nidMapLibreIsochroneLayer]',
  standalone: true
})
export class NgxMaplibreIsochroneLayerDirective extends NgxMapLayer<Map> implements OnDestroy {
  /**
   * // TODO Enrique:
   */
  @Input() set locations(value: IsochroneLocationArgs[]) {
    this._locations = value;
    this.requestNotifier$.next();
  }

  get locations(): IsochroneLocationArgs[] {
    return this._locations
  }

  override getLayerId(): string {
    return 'isochrone-maplibre'
  }

  override setLayerVisibility(isVisible: boolean): void {
    // TODO Enrique: Implement
  }

  override removeSelfLayer(): void {
    // TODO Enrique: Implement
  }

  // TODO Enrique: Perhaps this can be moved to be a singleton and share with other layers
  private readonly valhallaClient: Valhalla

  private _locations: IsochroneLocationArgs[];

  private requestNotifier$ = new Subject<void>();
  private subscriptions = new Subscription()

  private readonly TIME_BETWEEN_REQUESTS = 500;
  private readonly TIME_TO_DEBOUNCE_LOCATIONS_CHANGE = 500;

  constructor(@Inject(VALHALLA_API_CONFIG) valhallaConfig: ValhallaApiConfigToken) {
    super();
    this.valhallaClient = new Valhalla()
    this.registerDebouncedRequest();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.subscriptions.unsubscribe()
  }

  private registerDebouncedRequest() {
    this.subscriptions.add(
      this.requestNotifier$.pipe(
        debounceTime(this.TIME_TO_DEBOUNCE_LOCATIONS_CHANGE),
        filter(() => !!this.locations?.length),
        switchMap(() => this.performDataRequest()),
      ).subscribe(data => {
        // console.log('\x1B[46;30m ALL', data);
      }))
  }


  private performDataRequest() {
    return from(this.locations)
      .pipe(
        concatMap((locationArgs, index) =>
          from(this.valhallaClient.reachability([locationArgs.location.lat, locationArgs.location.lon], locationArgs.costType, locationArgs.intervals.map(i => i.seconds), {
            polygons: true,
            colors: locationArgs.intervals.map(i => i.color)
          }).catch<ValhallaIsochrones>(() => ({
            raw: undefined,
            isochrones: []
          })))
            .pipe(
              tap(response => {
                const sourceId = `nid-isochrone-${index}`;
                const geojson = response.raw;
                if (!geojson) return
                const source = this.ngxMapCore.mapCore.getSource(sourceId) as GeoJSONSource
                if (source) {
                  source.setData(geojson)
                } else {
                  this.ngxMapCore.mapCore.addSource(sourceId, {
                    type: 'geojson',
                    data: geojson
                  });
                  this.insertLayer(sourceId);
                }
              }),
              switchMap(response => iif(() => index < this.locations.length - 1, of(response).pipe(delay(this.TIME_BETWEEN_REQUESTS)), of(response)))
            )
        )
      );
  }

  private insertLayer(sourceId: string) {
    this.ngxMapCore.insertLayer({
      id: `${sourceId}__layer`,
      type: 'fill',
      source: sourceId,
      layout: {},
      paint: {
        'fill-color': ['get', 'fillColor'],
        'fill-opacity': ['get', 'fillOpacity'],
      }
    })
  }
}
