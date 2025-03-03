import {Component} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'sri-auth-wrapper',
  imports: [NavbarComponent],
  standalone: true,
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.scss',
})
export class AuthWrapperComponent {
  selectedSampleAppsSidebarNav: string;
}
