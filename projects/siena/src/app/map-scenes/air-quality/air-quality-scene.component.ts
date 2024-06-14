import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxMapLibreWeatherLayerDirective} from '@nidiro/ngx-map-weather-layer'
import {NgxMapLibreCoreComponent} from "@nidiro/ngx-map-core";

@Component({
  selector: 'sin-air-quality-scene',
  standalone: true,
  imports: [NgxMapLibreWeatherLayerDirective],
  templateUrl: './air-quality-scene.component.html',
  styleUrl: './air-quality-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirQualitySceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;

  weatherDataset = 'cams/particulate_matter_10um_10m_above_ground';
}
