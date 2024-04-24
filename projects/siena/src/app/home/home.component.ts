import {ChangeDetectionStrategy, Component} from '@angular/core';
import {InitialPosition} from '@nidiro/ngx-map-core'

@Component({
  selector: 'sin-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  /**
   * Veracruz
   */
  initialPosition: InitialPosition = {
    longitude: -96.1499142,
    latitude: 19.1686418,
    zoom: 10
  };

}
