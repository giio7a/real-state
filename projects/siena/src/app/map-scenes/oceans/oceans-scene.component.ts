import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxMapLibreWeatherLayerDirective} from '@nidiro/ngx-map-weather-layer';
import {NgxMapLibreCoreComponent} from '@nidiro/ngx-map-core';
import {MatChipsModule} from '@angular/material/chips';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'sin-oceans-scene',
  standalone: true,
  imports: [NgxMapLibreWeatherLayerDirective, MatChipsModule, TranslateModule],
  templateUrl: './oceans-scene.component.html',
  styleUrl: './oceans-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OceansSceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;

  options = [
    'gfswave/waves',
    'gfswave/swell',
    'gfswave/swell2',
    'gfswave/swell3',
    'gfswave/significant_wave_height',
    'cmems_phy/currents',
    'cmems_phy_merged/tidal_currents',
    'cmems_sst/sea_surface_temperature',
    'cmems_sst/sea_ice_fraction',
  ];
  weatherDataset = this.options[0];
}
