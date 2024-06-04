import {Directive, EventEmitter, Inject, Input, OnDestroy, Output} from '@angular/core';
import {NgxMapLayer, VALHALLA_API_CLIENT, VALHALLA_API_CONFIG, ValhallaApiConfigToken} from '@nidiro/ngx-map-core';
import {GeoJSONSource, Map} from 'maplibre-gl';
import {Valhalla, ValhallaCostingType, ValhallaIsochrones, ValhallaLocation} from '@routingjs/valhalla'
import {
  concatMap,
  debounceTime,
  delay,
  filter,
  finalize,
  from,
  iif,
  of,
  Subject,
  Subscription,
  switchMap,
  tap
} from 'rxjs';

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

  @Output() locationsLoaded = new EventEmitter<void>();

  get locations(): IsochroneLocationArgs[] {
    return this._locations
  }

  override getLayerId(): string {
    return 'isochrone-maplibre' + Date.now();
  }

  override setLayerVisibility(isVisible: boolean): void {
    // TODO Enrique: Implement
  }

  override removeSelfLayer(): void {
    // TODO Enrique: Implement
  }

  private _locations: IsochroneLocationArgs[];

  private requestNotifier$ = new Subject<void>();
  private subscriptions = new Subscription()

  /**
   * This delay is to avoid the "Too many requests" error from the Valhalla API.
   *
   * {@link https://github.com/valhalla/valhalla/discussions/3373#discussioncomment-1644713 Rate limit}.
   * @private
   */
  private readonly TIME_BETWEEN_REQUESTS = 500;
  private readonly TIME_TO_DEBOUNCE_LOCATIONS_CHANGE = 500;

  constructor(@Inject(VALHALLA_API_CONFIG) valhallaConfig: ValhallaApiConfigToken,
              @Inject(VALHALLA_API_CLIENT) private valhallaClient: Valhalla) {
    super();
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
      }))
  }


  private performDataRequest() {
    // TODO Enrique: According to the docs, the Isochrones API can handle multiple locations at once
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
                const sourceId = `${this.getLayerId()}-${index}`;
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
        ),
        finalize(() => {
          this.locationsLoaded.emit();
        })
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
