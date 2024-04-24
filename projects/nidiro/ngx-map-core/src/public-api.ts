/*
 * Public API Surface of ngx-map-core
 */
import {NgxOpenLayersCoreComponent} from './lib/ngx-open-layers-core/ngx-open-layers-core.component';
import {NgxMapLibreCoreComponent} from './lib/ngx-maplibre-core/ngx-maplibre-core.component'

export {NgxMapLayer} from './lib/architecture/ngx-map-layer'
export {NgxOpenLayersCoreComponent} from './lib/ngx-open-layers-core/ngx-open-layers-core.component'
export {NgxMapLibreCoreComponent} from './lib/ngx-maplibre-core/ngx-maplibre-core.component'
export const NGX_OPEN_LAYERS_CORE_DIRECTIVES = [NgxOpenLayersCoreComponent, NgxMapLibreCoreComponent] as const;
