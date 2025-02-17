import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'sri-login',
  standalone: true,
  imports: [CommonModule, CardModule, InputTextModule, ButtonDirective, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  email: string = 'admin@nidiro.mx'; // TODO Enrique: clear
  password: string = 'admin '; // TODO Enrique: clear

  submitLogIn() {
    console.log('\x1B[46;30m ', 'submitLogIn', '\x1B[0m', this.email, this.password);
  }
}
