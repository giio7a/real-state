import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BamaCoverageComponent} from "../../map-layers/bama-coverage/bama-coverage.component";
import {OxxoCoverageComponent} from "../../map-layers/oxxo-coverage/oxxo-coverage.component";
import {NgxMapLibreCoreComponent} from "@nidiro/ngx-map-core";

@Component({
  selector: 'sin-oxxo-bama-coverage-scene',
  standalone: true,
  imports: [
    BamaCoverageComponent,
    OxxoCoverageComponent,
  ],
  templateUrl: './oxxo-bama-coverage-scene.component.html',
  styleUrl: './oxxo-bama-coverage-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxxoBamaCoverageSceneComponent {
  @Input() mapLibreMapCore: NgxMapLibreCoreComponent;
}
