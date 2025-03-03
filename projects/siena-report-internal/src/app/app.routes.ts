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
    canActivate: [authenticatedGuard],
    loadComponent: () => import('./auth-wrapper/auth-wrapper.component').then((m) => m.AuthWrapperComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings-page/settings-page.component').then((m) => m.SettingsPageComponent),
      },
    ],
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];
