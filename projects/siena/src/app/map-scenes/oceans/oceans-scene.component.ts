import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxMapLibreWeatherLayerDirective} from '@nidiro/ngx-map-weather-layer'
import {NgxMapLibreCoreComponent} from "@nidiro/ngx-map-core";

@Component({
  selector: 'sin-oceans-scene',
  standalone: true,
  imports: [
    NgxMapLibreWeatherLayerDirective,
  ],
  templateUrl: './oceans-scene.component.html',
  styleUrl: './oceans-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OceansSceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;

  weatherDataset = 'gfswave/waves';
}
