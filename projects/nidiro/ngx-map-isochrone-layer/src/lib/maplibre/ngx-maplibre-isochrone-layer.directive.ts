import {Directive, Inject, Input, OnDestroy} from '@angular/core';
import {NgxMapLayer, VALHALLA_API_CONFIG, ValhallaApiConfigToken} from '@nidiro/ngx-map-core';
import {GeoJSONSource, Map} from 'maplibre-gl';
import {Valhalla, ValhallaCostingType, ValhallaLocation} from '@routingjs/valhalla'
import {debounceTime, from, Subject, Subscription, switchMap, tap} from 'rxjs';

@Directive({
  selector: '[nidMapLibreIsochroneLayer]',
  standalone: true
})
export class NgxMaplibreIsochroneLayerDirective extends NgxMapLayer<Map> implements OnDestroy {
  /**
   * // TODO Enrique:
   */
  @Input() set locations(value: ValhallaLocation[]) {
    this._locations = value;
    this.requestNotifier$.next();
  }

  @Input() set costType(value: ValhallaCostingType) {
    this._costType = value
    this.requestNotifier$.next();
  }

  get locations(): ValhallaLocation[] {
    return this._locations
  }

  get costType(): ValhallaCostingType {
    return this._costType
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

  private _locations: ValhallaLocation[];
  private _costType: ValhallaCostingType;

  private hasAddedLayer = false;
  private requestNotifier$ = new Subject<void>();
  private subscriptions = new Subscription()

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
        debounceTime(3000),
        switchMap(() => this.performDataRequest()),
        // catchError(()=>of()), // TODO Enrique: handle error
        tap(response => {
          const geojson = response.raw;
          const source = this.ngxMapCore.mapCore.getSource('isochrone') as GeoJSONSource
          if (source) {
            source.setData(geojson)
          } else {
            this.ngxMapCore.mapCore.addSource('isochrone', {
              type: 'geojson',
              data: geojson
            });
          }
          this.initLayer();
        }),
      ).subscribe())
  }

  private performDataRequest() {
    // TODO Enrique: Implement multiple locations!
    return from(this.valhallaClient.reachability([this.locations[0].lat, this.locations[0].lon], this.costType, [10 * 60, 20 * 60], {polygons: true}))
  }

  private initLayer() {
    if (this.hasAddedLayer) return;

    this.ngxMapCore.insertLayer({
      'id': 'isochrone',
      'type': 'fill',
      'source': 'isochrone',
      'layout': {},
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
      }
    })
    this.hasAddedLayer = true;
  }
}
