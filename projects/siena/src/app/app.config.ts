import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {VALHALLA_API_CLIENT, VALHALLA_API_CONFIG, ValhallaApiConfigToken} from '@nidiro/ngx-map-core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {Valhalla} from '@routingjs/valhalla';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NGX_WEATHER_LAYER_CONFIG, WeatherLayersConfigToken} from "@nidiro/ngx-map-weather-layer";
import {environment} from "../environments/environment";

const valhallaConfig: ValhallaApiConfigToken = {
  apiKey: 'XXXX' // TODO Enrique: Obtain
}

const weatherLayersConfig: WeatherLayersConfigToken = {
  debug: true,
  weatherLayersAccessToken: environment.weatherLayersToken
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {provide: VALHALLA_API_CONFIG, useValue: valhallaConfig},
    {provide: VALHALLA_API_CLIENT, useValue: new Valhalla()}, // TODO Enrique: We can make the ValhallaClient to be singleton and manage the requests sequentially
    {provide: NGX_WEATHER_LAYER_CONFIG, useValue: weatherLayersConfig},
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: CustomHttpLoaderFactory,
          deps: [HttpClient],
        },
        useDefaultLang: true,
      })
    ),
  ]
};

function CustomHttpLoaderFactory(http: HttpClient) {
  // We use date now to prevent cache
  return new TranslateHttpLoader(http, './assets/i18n/', `.json?v=${Date.now()}`);
}
