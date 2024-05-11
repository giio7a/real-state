/*
 * Public API Surface of ngx-map-weather-layer
 */
import {NgxOpenLayersWeatherDirective} from './lib/open-layers/ngx-open-layers-weather.directive';

export {NGX_WEATHER_LAYER_CONFIG, WeatherLayersConfigToken} from './lib/common/injection-token';
export {NgxOpenLayersWeatherDirective} from './lib/open-layers/ngx-open-layers-weather.directive'
export const NGX_OPEN_LAYERS_WEATHER_DIRECTIVES = [NgxOpenLayersWeatherDirective] as const;
