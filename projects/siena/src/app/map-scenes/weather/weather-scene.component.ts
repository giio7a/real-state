import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxMapLibreWeatherLayerDirective} from '@nidiro/ngx-map-weather-layer'
import {NgxMapLibreCoreComponent} from "@nidiro/ngx-map-core";

@Component({
  selector: 'sin-weather-scene',
  standalone: true,
  imports: [
    NgxMapLibreWeatherLayerDirective,
  ],
  templateUrl: './weather-scene.component.html',
  styleUrl: './weather-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherSceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;

  weatherDataset = 'gfs/wind_10m_above_ground';
}
