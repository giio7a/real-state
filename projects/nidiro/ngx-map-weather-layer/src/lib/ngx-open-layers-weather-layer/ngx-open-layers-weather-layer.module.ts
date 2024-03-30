import {NgModule} from '@angular/core';
import {NgxOpenLayersWeatherDirective} from './ngx-open-layers-weather.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NgxOpenLayersWeatherDirective],
  exports: [NgxOpenLayersWeatherDirective],
  imports: [CommonModule]
})
export class NgxOpenLayersWeatherLayerModule {
}
