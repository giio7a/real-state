import {Directive, Input, OnInit} from '@angular/core';

/**
 * TODO: Describe
 */
export interface InitialPosition {
  latitude: number;
  longitude: number;
  altitude?: number;
  zoom: number
}

/**
 * TODO: Describe
 */
export interface INgxMapCore<MapImplementation> {
  initialPosition?: InitialPosition;

  // TODO Enrique: Consider min and max zooms as Input

  mapCore: MapImplementation;

  initMap(): void;

  insertLayer(...args: unknown[]): unknown; // Not typed to allow the implementation decide its arguments.
}

@Directive()
/**
 * TODO: Describe
 */
export abstract class NgxMapCoreCommon<MapImplementation> implements INgxMapCore<MapImplementation>, OnInit {
  @Input() initialPosition?: InitialPosition;

  mapCore: MapImplementation;

  abstract initMap(): void;

  abstract insertLayer(...args: unknown[]): unknown;

  readonly defaultInitialPosition: NgxMapCoreCommon<MapImplementation>['initialPosition'] = {
    longitude: 0,
    latitude: 0,
    zoom: 1
  }

  ngOnInit() {
    this.initMap();
  }
}
