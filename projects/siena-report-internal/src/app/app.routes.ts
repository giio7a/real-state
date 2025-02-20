import {Route} from '@angular/router';
import {authenticatedGuard, unauthenticatedGuard} from './auth-wrapper/authenticated.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [unauthenticatedGuard],
  },
  {
    path: 'a',
    loadComponent: () => import('./auth-wrapper/auth-wrapper.component').then((m) => m.AuthWrapperComponent),
    canActivate: [authenticatedGuard],
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];
