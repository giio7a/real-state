import {Directive, Input, OnInit} from '@angular/core';

/**
 * TODO: Describe
 */
export interface INgxMapCore<MapImplementation> {
  initialPosition?: {latitude: number; longitude: number; altitude?: number; zoom: number};

  // TODO Enrique: Consider min and max zooms as Input

  mapCore: MapImplementation;

  initMap(): void;
}

@Directive()
export abstract class NgxMapCoreCommon<MapImplementation> implements INgxMapCore<MapImplementation>, OnInit {
  @Input() initialPosition: {latitude: number; longitude: number; altitude?: number; zoom: number} | undefined;

  mapCore!: MapImplementation; // Marking as ! because the implementations must define it on ngOnInit

  abstract initMap(): void;

  readonly defaultInitialPosition: NgxMapCoreCommon<MapImplementation>['initialPosition'] = {
    longitude: 0,
    latitude: 0,
    zoom: 1
  }

  ngOnInit() {
    this.initMap();
  }
}
