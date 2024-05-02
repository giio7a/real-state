import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InitialPosition} from '@nidiro/ngx-map-core'

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

  locationsForIsochrones: {lat: number; lon: number}[] = [];
  costType: 'auto' | 'pedestrian' = 'auto'

  ngOnInit() {
    this.locationsForIsochrones = [{lat: this.initialPosition.latitude, lon: this.initialPosition.longitude}]
  }

  test() {
    this.locationsForIsochrones = [{lat: 19.4326, lon: -99.1332}, ...this.locationsForIsochrones]
  }
}
