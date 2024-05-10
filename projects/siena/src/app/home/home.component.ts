import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InitialPosition} from '@nidiro/ngx-map-core'
import {IsochroneLocationArgs} from '@nidiro/ngx-map-isochrone-layer';

@Component({
  selector: 'sin-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  /**
   * Veracruz
   */
  initialPosition: InitialPosition = {
    longitude: -94.43294,
    latitude: 18.14104,
    zoom: 13
  };

  locationsForIsochrones: IsochroneLocationArgs[] = [];
  intervals: {seconds: number; color: string}[] = [
    {seconds: 300, color: 'ff0000'},
    {seconds: 600, color: 'ff0000'},
    {seconds: 900, color: 'ff0000'}
  ]

  mapLoaded: boolean;
  isochronesLoaded: boolean = false;

  ngOnInit() {
    this.locationsForIsochrones = [{
      location: {lat: this.initialPosition.latitude, lon: this.initialPosition.longitude},
      costType: 'pedestrian',
      intervals: this.intervals
    }]
  }

  test() {
    this.locationsForIsochrones = [{
      location: {lat: 19.4326, lon: -99.1332},
      costType: 'auto',
      intervals: [{seconds: 300, color: '00ff00'},
        {seconds: 600, color: '00ff00'},
        {seconds: 900, color: '00ff00'}]
    }, ...this.locationsForIsochrones]
  }
}
