import {DirectionType, GridStyle} from 'weatherlayers-gl';

export const CONTOUR_LAYER_DATASET_CONFIG: Record<string, {interval: number; majorInterval: number}> = {
  'gfs/temperature_2m_above_ground': {interval: 2, majorInterval: 10},
  'gfs/apparent_temperature_2m_above_ground': {interval: 2, majorInterval: 10},
  'gfs/pressure_mean_sea_level': {interval: 2, majorInterval: 10},
  'cmems_sst/sea_surface_temperature': {interval: 2, majorInterval: 10},
};
export const HIGH_LOW_LAYER_DATASET_CONFIG: Record<string, {radius: number}> = {
  'gfs/pressure_mean_sea_level': {radius: 2000},
};
export const GRID_LAYER_DATASET_CONFIG: Record<string, {style: GridStyle; iconBounds?: [number, number]}> = {
  'gfs/wind_10m_above_ground': {style: GridStyle.WIND_BARB, iconBounds: [0, 100 * 0.51444]}, // 100 kts to m/s
  'gfs/wind_100m_above_ground': {style: GridStyle.WIND_BARB, iconBounds: [0, 100 * 0.51444]}, // 100 kts to m/s
  'gfs/temperature_2m_above_ground': {style: GridStyle.VALUE},
  'gfs/apparent_temperature_2m_above_ground': {style: GridStyle.VALUE},
  'gfswave/waves': {style: GridStyle.ARROW, iconBounds: [0, 35]},
  'gfswave/swell': {style: GridStyle.ARROW, iconBounds: [0, 35]},
  'gfswave/swell2': {style: GridStyle.ARROW, iconBounds: [0, 35]},
  'gfswave/swell3': {style: GridStyle.ARROW, iconBounds: [0, 35]},
  'cmems_phy/currents': {style: GridStyle.ARROW, iconBounds: [0, 3]},
  'cmems_phy_merged/tidal_currents': {style: GridStyle.ARROW, iconBounds: [0, 3]},
  'cmems_sst/sea_surface_temperature': {style: GridStyle.VALUE},
};
export const PARTICLE_LAYER_DATASET_CONFIG: Record<string, {speedFactor: number; width: number}> = {
  'gfs/wind_10m_above_ground': {speedFactor: 3, width: 2},
  'gfs/wind_100m_above_ground': {speedFactor: 3, width: 2},
  'gfswave/waves': {speedFactor: 2, width: 5},
  'gfswave/swell': {speedFactor: 2, width: 5},
  'gfswave/swell2': {speedFactor: 2, width: 5},
  'gfswave/swell3': {speedFactor: 2, width: 5},
  'cmems_phy/currents': {speedFactor: 50, width: 2},
  'cmems_phy_merged/tidal_currents': {speedFactor: 50, width: 2},
};
export const TOOLTIP_CONTROL_DATASET_CONFIG: Record<string, {directionType: DirectionType}> = {
  'gfs/wind_10m_above_ground': {directionType: DirectionType.INWARD},
  'gfs/wind_100m_above_ground': {directionType: DirectionType.INWARD},
  'gfswave/waves': {directionType: DirectionType.INWARD},
  'gfswave/swell': {directionType: DirectionType.INWARD},
  'gfswave/swell2': {directionType: DirectionType.INWARD},
  'gfswave/swell3': {directionType: DirectionType.INWARD},
  'cmems_phy/currents': {directionType: DirectionType.OUTWARD},
  'cmems_phy_merged/tidal_currents': {directionType: DirectionType.OUTWARD},
};

export const WEATHER_LAYERS_UTIL = {
  NO_DATA: 'no data',
  DEFAULT_DATASET: 'gfs/wind_10m_above_ground',
  componentToHex(value: any) {
    return value.toString(16).padStart(2, '0');
  },
  colorToCss(color: any) {
    return `#${this.componentToHex(color[0])}${this.componentToHex(color[1])}${this.componentToHex(color[2])}${this.componentToHex(typeof color[3] === 'number' ? color[3] : 255)}`;
  },
  cssToColor(color: any) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (!result) {
      throw new Error('Invalid argument');
    }
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      parseInt(result[4], 16)
    ];
  },
  isMetalWebGl2() {
    // iOS 15+
    return navigator.maxTouchPoints && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
  }
}
