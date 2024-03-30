import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {
  NgxOpenLayersCoreModule
} from '@nidiro/ngx-map-core';
import {HomeComponent} from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxOpenLayersCoreModule
  ]
})
export class HomeModule {
}
