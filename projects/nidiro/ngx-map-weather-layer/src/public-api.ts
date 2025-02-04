/*
 * Public API Surface of ngx-map-weather-layer
 */
import {NgxOpenLayersWeatherDirective} from './lib/open-layers/ngx-open-layers-weather.directive';
import {NgxMapLibreWeatherLayerDirective} from './lib/maplibre/ngx-maplibre-weather-layer.directive';

export {NGX_WEATHER_LAYER_CONFIG, WeatherLayersConfigToken} from './lib/common/injection-token';
export {NgxOpenLayersWeatherDirective} from './lib/open-layers/ngx-open-layers-weather.directive';
export {NgxMapLibreWeatherLayerDirective} from './lib/maplibre/ngx-maplibre-weather-layer.directive';
export const NGX_OPEN_LAYERS_WEATHER_DIRECTIVES = [NgxOpenLayersWeatherDirective] as const;
export const NGX_MAPLIBRE_WEATHER_DIRECTIVES = [NgxMapLibreWeatherLayerDirective] as const;
