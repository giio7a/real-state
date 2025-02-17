import {ApplicationConfig, InjectionToken} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

/**
 * The API path. What comes after the host. E.g. in http://localhost:8080/api/v1, the API path is /api/v1.
 */
export const SIENA_API = new InjectionToken('SIENA_API');

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects(),
    provideRouter(appRoutes),
    provideHttpClient(),
    {
      provide: SIENA_API,
      useValue: '/api/v1',
    },
  ],
};
