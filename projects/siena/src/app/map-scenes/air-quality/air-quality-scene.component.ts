import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxMapLibreWeatherLayerDirective} from '@nidiro/ngx-map-weather-layer';
import {NgxMapLibreCoreComponent} from '@nidiro/ngx-map-core';
import {MatChipsModule} from '@angular/material/chips';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'sin-air-quality-scene',
  standalone: true,
  imports: [NgxMapLibreWeatherLayerDirective, MatChipsModule, TranslateModule],
  templateUrl: './air-quality-scene.component.html',
  styleUrl: './air-quality-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirQualitySceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;

  options = [
    'cams/particulate_matter_10um_10m_above_ground',
    'cams/particulate_matter_2p5um_10m_above_ground',
    'cams/carbon_monoxide_10m_above_ground',
    'cams/sulphur_dioxide_10m_above_ground',
    'cams/nitrogen_dioxide_10m_above_ground',
    'cams/ozone_10m_above_ground',
  ];
  weatherDataset = this.options[0];
}
