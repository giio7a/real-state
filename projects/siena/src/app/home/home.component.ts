import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InitialPosition} from '@nidiro/ngx-map-core';
import {IsochroneLocationArgs} from '@nidiro/ngx-map-isochrone-layer';
import {MatDrawer} from '@angular/material/sidenav';

enum MapScene {
  weather = 'weather',
  oceans = 'oceans',
  airQuality = 'airQuality',
  oxxoBamaCoverage = 'oxxoBamaCoverage',
}

@Component({
  selector: 'sin-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  selectedMapScene: MapScene;

  availableScenes = MapScene;

  /**
   * Veracruz
   */
  initialPosition: InitialPosition = {
    longitude: -94.43294,
    latitude: 18.14104,
    zoom: 13,
  };

  locationsForIsochrones: IsochroneLocationArgs[] = [];
  intervals: {seconds: number; color: string}[] = [
    {seconds: 300, color: 'ff0000'},
    {seconds: 600, color: 'ff0000'},
    {seconds: 900, color: 'ff0000'},
  ];

  mapLoaded: boolean;
  weatherDataset = 'gfs/wind_10m_above_ground';

  // weatherDataset = 'gfswave/waves';

  ngOnInit() {
    this.locationsForIsochrones = [
      {
        location: {lat: this.initialPosition.latitude, lon: this.initialPosition.longitude},
        costType: 'pedestrian',
        intervals: this.intervals,
      },
    ];
  }

  selectMapScene(scene: MapScene, drawer?: MatDrawer) {
    this.selectedMapScene = scene;
    drawer?.close();
  }
}
