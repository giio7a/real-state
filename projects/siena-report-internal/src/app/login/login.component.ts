import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {GlobalActions} from '../store/global.actions';

@Component({
  selector: 'sri-login',
  imports: [CommonModule, CardModule, InputTextModule, FormsModule, Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private store: Store) {}

  submitLogIn() {
    this.store.dispatch(GlobalActions.submitLogIn({email: this.email, password: this.password}));
  }
}
