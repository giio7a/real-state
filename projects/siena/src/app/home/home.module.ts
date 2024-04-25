import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {NGX_OPEN_LAYERS_CORE_DIRECTIVES, NgxOpenLayersCoreComponent} from '@nidiro/ngx-map-core';
import {HomeComponent} from './home.component';
import {NGX_OPEN_LAYERS_WEATHER_DIRECTIVES, NgxOpenLayersWeatherDirective} from '@nidiro/ngx-map-weather-layer';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MapSidePanelModule} from '../map-side-panel/map-side-panel.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NGX_OPEN_LAYERS_CORE_DIRECTIVES as [typeof NgxOpenLayersCoreComponent],
    NGX_OPEN_LAYERS_WEATHER_DIRECTIVES as [typeof NgxOpenLayersWeatherDirective],
    MatSlideToggleModule,
    MapSidePanelModule
  ]
})
export class HomeModule {
}
