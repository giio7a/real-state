import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'sri-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor() {
    console.log('\x1B[46;30m Home Page');
  }
}
