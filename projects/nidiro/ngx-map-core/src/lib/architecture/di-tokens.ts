import {InjectionToken} from '@angular/core';

export interface ValhallaApiConfigToken {
  apiKey: string
}

export const VALHALLA_API_CONFIG = new InjectionToken<ValhallaApiConfigToken>('VALHALLA_API_CONFIG');
