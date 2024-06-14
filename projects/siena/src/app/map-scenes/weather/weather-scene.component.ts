import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxMapLibreWeatherLayerDirective} from '@nidiro/ngx-map-weather-layer'
import {NgxMapLibreCoreComponent} from '@nidiro/ngx-map-core';
import {MatChipsModule} from '@angular/material/chips';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'sin-weather-scene',
  standalone: true,
  imports: [
    NgxMapLibreWeatherLayerDirective,
    MatChipsModule,
    TranslateModule,
  ],
  templateUrl: './weather-scene.component.html',
  styleUrl: './weather-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherSceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;

  options = [
    'gfs/wind_10m_above_ground',
    'gfs/wind_100m_above_ground',
    'gfs/wind_gust_surface',
    'gfs/precipitation_3h_accumulation_surface',
    'gfs/precipitable_water_entire_atmosphere',
    'gfs/temperature_2m_above_ground',
    'gfs/apparent_temperature_2m_above_ground',
    'gfs/relative_humidity_2m_above_ground',
    'gfs/pressure_mean_sea_level',
    'gfs/geopotential_height_500mb',
    'gfs/snow_depth_surface',
    'gfs/cloud_water_entire_atmosphere',
    'gfs/cloud_cover_entire_atmosphere',
    'gfs/cloud_cover_low_cloud_layer',
    'gfs/cloud_cover_middle_cloud_layer',
    'gfs/cloud_cover_high_cloud_layer',
    'gfs/reflectivity_1000m_above_ground',
    'gfs/downward_short_wave_radiation_flux_surface',
    'gfs/convective_available_potential_energy_surface',
  ]
  weatherDataset = this.options[0];
}
