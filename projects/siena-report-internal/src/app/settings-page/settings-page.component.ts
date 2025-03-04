import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'sri-settings-page',
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  constructor() {
    console.log('\x1B[46;30m ', 'Settings Page');
  }
}
