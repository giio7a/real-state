import {InjectionToken} from '@angular/core';
import {ValhallaClient} from '@routingjs/valhalla';

export interface ValhallaApiConfigToken {
  apiKey: string
}

export const VALHALLA_API_CONFIG = new InjectionToken<ValhallaApiConfigToken>('VALHALLA_API_CONFIG');

export const VALHALLA_API_CLIENT = new InjectionToken<ValhallaClient>('VALHALLA_API_CLIENT');
