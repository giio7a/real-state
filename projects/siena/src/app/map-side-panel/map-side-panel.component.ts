import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sin-map-side-panel',
  templateUrl: './map-side-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSidePanelComponent {
  isSidePanelOpen = false;
}
