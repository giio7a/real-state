import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {
  NGX_OPEN_LAYERS_CORE_DIRECTIVES,
  NgxOpenLayersCoreComponent,
  NgxMapLibreCoreComponent
} from '@nidiro/ngx-map-core';
import {HomeComponent} from './home.component';
import {NGX_OPEN_LAYERS_WEATHER_DIRECTIVES, NgxOpenLayersWeatherDirective} from '@nidiro/ngx-map-weather-layer';
import {NGX_MAPLIBRE_ISOCHRONE_DIRECTIVES, NgxMaplibreIsochroneLayerDirective} from '@nidiro/ngx-map-isochrone-layer';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MapSidePanelModule} from '../map-side-panel/map-side-panel.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NGX_OPEN_LAYERS_CORE_DIRECTIVES as [typeof NgxOpenLayersCoreComponent, typeof NgxMapLibreCoreComponent],
    NGX_OPEN_LAYERS_WEATHER_DIRECTIVES as [typeof NgxOpenLayersWeatherDirective],
    NGX_MAPLIBRE_ISOCHRONE_DIRECTIVES as [typeof NgxMaplibreIsochroneLayerDirective],
    MatSlideToggleModule,
    MapSidePanelModule
  ]
})
export class HomeModule {
}
