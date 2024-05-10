import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {VALHALLA_API_CONFIG, VALHALLA_API_CLIENT, ValhallaApiConfigToken} from '@nidiro/ngx-map-core';
import {provideHttpClient} from '@angular/common/http';
import {Valhalla} from '@routingjs/valhalla';

const valhallaConfig: ValhallaApiConfigToken = {
  apiKey: 'XXXX' // TODO Enrique: Obtain
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {provide: VALHALLA_API_CONFIG, useValue: valhallaConfig},
    {provide: VALHALLA_API_CLIENT, useValue: new Valhalla()}, // TODO Enrique: We can make the ValhallaClient to be singleton and manage the requests sequentially
    provideHttpClient(),
  ]
};
