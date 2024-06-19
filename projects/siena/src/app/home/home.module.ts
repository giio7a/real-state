import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {NgxMapLibreCoreComponent} from '@nidiro/ngx-map-core';
import {HomeComponent} from './home.component';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {OxxoBamaCoverageSceneComponent} from "../map-scenes/oxxo-bama-coverage/oxxo-bama-coverage-scene.component";
import {WeatherSceneComponent} from "../map-scenes/weather/weather-scene.component";
import {OceansSceneComponent} from "../map-scenes/oceans/oceans-scene.component";
import {AirQualitySceneComponent} from "../map-scenes/air-quality/air-quality-scene.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    OxxoBamaCoverageSceneComponent,
    WeatherSceneComponent,
    OceansSceneComponent,
    AirQualitySceneComponent,

    NgxMapLibreCoreComponent,

    MatButton,
    MatDrawer,
    MatDrawerContainer,
    NgOptimizedImage,
    MatIcon,
    MatIconButton,
    MatCardModule,
    TranslateModule
  ]
})
export class HomeModule {
}
