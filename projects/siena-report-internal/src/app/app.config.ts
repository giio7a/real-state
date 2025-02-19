import {APP_INITIALIZER, ApplicationConfig, InjectionToken, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideStore, Store} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {GlobalEffects, globalReducer} from './store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authenticationInterceptor, initialTokenLoad} from './interceptors/authentication-interceptor';

/**
 * The API path. What comes after the host. E.g. in http://localhost:8080/api/v1, the API path is /api/v1.
 */
export const SIENA_API = new InjectionToken('SIENA_API');

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      global: globalReducer,
    }),
    provideStoreDevtools({
      logOnly: !isDevMode(),
      name: 'Siena Report Internal',
    }),
    provideEffects(GlobalEffects),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    {
      provide: SIENA_API,
      useValue: '/api/v1',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => () => initialTokenLoad(store),
      deps: [Store],
      multi: true,
    },
  ],
};
