import {NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MapSidePanelComponent} from './map-side-panel.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [MapSidePanelComponent],
  exports: [MapSidePanelComponent],
  imports: [
    CommonModule,
    MatIconModule,
    NgOptimizedImage,
    MatButtonModule,
    TranslateModule
  ]
})
export class MapSidePanelModule { }
