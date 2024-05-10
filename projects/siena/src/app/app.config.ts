import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {VALHALLA_API_CONFIG, ValhallaApiConfigToken} from '@nidiro/ngx-map-core';

const valhallaConfig: ValhallaApiConfigToken = {
  apiKey: 'XXXX' // TODO Enrique: Obtain
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    {provide: VALHALLA_API_CONFIG, useValue: valhallaConfig}]
};
