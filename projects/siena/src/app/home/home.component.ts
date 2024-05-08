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
    longitude: -96.1499142,
    latitude: 19.1686418,
    zoom: 10
  };

  locationsForIsochrones: IsochroneLocationArgs[] = [];
  intervals: {seconds: number; color: string}[] = [
    {seconds: 300, color: 'ff0000'},
    {seconds: 600, color: 'ff0000'},
    {seconds: 900, color: 'ff0000'}
  ]

  ngOnInit() {
    this.locationsForIsochrones = [{
      location: {lat: this.initialPosition.latitude, lon: this.initialPosition.longitude},
      costType: 'auto',
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
