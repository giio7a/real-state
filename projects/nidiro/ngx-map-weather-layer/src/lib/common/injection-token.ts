import {InjectionToken} from '@angular/core';

export interface WeatherLayersConfigToken {
  debug?: boolean;
  /**
   * // TODO Enrique: Add description
   */
  weatherLayersAccessToken: string
}

export const NGX_WEATHER_LAYER_CONFIG = new InjectionToken<WeatherLayersConfigToken>('NGX_WEATHER_LAYER_CONFIG');
