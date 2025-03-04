import {Component} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sri-auth-wrapper',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.scss',
})
export class AuthWrapperComponent {}
