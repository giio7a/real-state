import {Directive, Inject, Input, OnInit} from '@angular/core';
import {NgxMapLayer} from '@nidiro/ngx-map-core'
import {Layer} from 'ol/layer';
import {toLonLat} from 'ol/proj';
import {Map} from 'ol'
import {Deck, MapView} from '@deck.gl/core/typed';
import {ClipExtension} from '@deck.gl/extensions/typed';
import {
  ContourLayer,
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  DEFAULT_LINE_COLOR,
  DEFAULT_LINE_WIDTH,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_FONT_FAMILY,
  DEFAULT_TEXT_OUTLINE_COLOR,
  DEFAULT_TEXT_OUTLINE_WIDTH,
  DEFAULT_TEXT_SIZE,
  DirectionFormat,
  DirectionType,
  GridLayer,
  GridStyle,
  HighLowLayer,
  ImageInterpolation,
  offsetDatetimeRange,
  ParticleLayer,
  Placement,
  RasterLayer,
  TooltipControl,
  UnitSystem,
} from 'weatherlayers-gl';
import {Client} from 'weatherlayers-gl/client';
import {BASEMAP_RASTER_STYLE_URL} from './basemap';
import {XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {Control} from 'ol/control';
import {NGX_WEATHER_LAYER_CONFIG, WeatherLayersConfigToken} from './injection-token';
import {
  CONTOUR_LAYER_DATASET_CONFIG,
  GRID_LAYER_DATASET_CONFIG,
  HIGH_LOW_LAYER_DATASET_CONFIG,
  PARTICLE_LAYER_DATASET_CONFIG,
  TOOLTIP_CONTROL_DATASET_CONFIG,
  WEATHER_LAYERS_UTIL,
} from './weatherlayers-gl.config';

@Directive({
  selector: '[nidOpenLayersWeatherLayer]',
  standalone: true,
})
export class NgxOpenLayersWeatherDirective extends NgxMapLayer<Map> implements OnInit {
  @Input() set dataset(value: string) {
    this._dataset = value;
    this.update();
  }

  private _dataset: string = WEATHER_LAYERS_UTIL.DEFAULT_DATASET;

  private deckInstance: Deck;
  private readonly weatherLayersClient: Client;
  private tooltipControl: TooltipControl;

  private readonly datetimeRange = offsetDatetimeRange(new Date().toISOString(), -24, 24);

  // TODO Enrique: rename
  private readonly update: () => Promise<void> = async () => {
    const config = this.config;
    if (!config.dataset || !this.weatherLayersClient) {
      return;
    }
    const {
      title,
      unitFormat,
      attribution,
      palette
    } = await this.weatherLayersClient.loadDataset(config.dataset, {unitSystem: config.unitSystem});
    const {datetimes} = await this.weatherLayersClient.loadDatasetSlice(config.dataset, config.datetimeRange);
    const datetime = config.datetime !== WEATHER_LAYERS_UTIL.NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] ? config.datetime : datetimes[0];
    const {
      image,
      image2,
      imageWeight,
      imageType,
      imageUnscale,
      bounds
    } = await this.weatherLayersClient.loadDatasetData(config.dataset, datetime, {datetimeInterpolate: config.datetimeInterpolate});

    // TODO Enrique: Avoided?
    // (config as any).datetimes = datetimes;
    // config.datetime = datetime;

    const raster = new RasterLayer({
      id: 'raster',
      // data properties
      image,
      image2,
      imageSmoothing: config.imageSmoothing,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType: imageType as any,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.raster.enabled,
      palette,
      opacity: config.raster.opacity,
      pickable: !WEATHER_LAYERS_UTIL.isMetalWebGl2(),
      extensions: [new ClipExtension()],
      clipBounds: [-181, -85.051129, 181, 85.051129],
    });
    const contour = new ContourLayer({
      id: 'contour',
      // data properties
      image,
      image2,
      imageSmoothing: config.imageSmoothing,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType: imageType as any,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.contour.enabled,
      interval: config.contour.interval,
      majorInterval: config.contour.majorInterval,
      width: config.contour.width,
      color: WEATHER_LAYERS_UTIL.cssToColor(config.contour.color) as any,
      palette: config.contour.palette ? palette : null,
      opacity: config.contour.opacity,
      extensions: [new ClipExtension()],
      clipBounds: [-181, -85.051129, 181, 85.051129],
    })
    const highLow = new HighLowLayer({
      id: 'highLow',
      // data properties
      image,
      image2,
      imageSmoothing: config.imageSmoothing,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType: imageType as any,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.highLow.enabled, // && !timelineControl.running,
      unitFormat: unitFormat as any,
      radius: config.highLow.radius,
      textSize: config.highLow.textSize,
      textColor: WEATHER_LAYERS_UTIL.cssToColor(config.highLow.textColor) as any,
      textOutlineColor: WEATHER_LAYERS_UTIL.cssToColor(config.highLow.textOutlineColor) as any,
      palette: config.highLow.palette ? palette : null,
      textOutlineWidth: config.highLow.textOutlineWidth,
      opacity: config.highLow.opacity,
    });
    const grid = new GridLayer({
      id: 'grid',
      // data properties
      image,
      image2,
      imageSmoothing: config.imageSmoothing,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType: imageType as any,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.grid?.enabled,
      style: config.grid?.style,
      density: config.grid?.density,
      unitFormat: unitFormat as any,
      textSize: config.grid?.textSize,
      textColor: WEATHER_LAYERS_UTIL.cssToColor(config.grid?.textColor) as any,
      textOutlineWidth: config.grid?.textOutlineWidth,
      textOutlineColor: WEATHER_LAYERS_UTIL.cssToColor(config.grid?.textOutlineColor) as any,
      iconBounds: config.grid?.iconBounds,
      iconSize: config.grid?.style === GridStyle.ARROW ? [config.grid.iconSize / 8, config.grid.iconSize] : config.grid?.iconSize,
      iconColor: WEATHER_LAYERS_UTIL.cssToColor(config.grid?.iconColor) as any,
      palette: config.grid?.palette ? palette : null,
      opacity: config.grid?.opacity,
    })
    const particle = new ParticleLayer({
      id: 'particle',
      // data properties
      image,
      image2,
      imageSmoothing: config.imageSmoothing,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType: imageType as any,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.particle?.enabled,
      numParticles: config.particle?.numParticles,
      maxAge: config.particle?.maxAge,
      speedFactor: config.particle?.speedFactor,
      width: config.particle?.width,
      color: WEATHER_LAYERS_UTIL.cssToColor(config.particle?.color) as any,
      palette: config.particle?.palette ? palette : null,
      opacity: config.particle?.opacity,
      animate: config.particle?.animate,
      extensions: [new ClipExtension()],
      clipBounds: [-181, -85.051129, 181, 85.051129],
      getPolygonOffset: () => [0, -1000],
    })
    this.deckInstance.setProps({
      layers: [raster, contour, highLow, grid, particle],
    });

    // legendControl.updateConfig({title, unitFormat, palette});
    // timelineControl.updateConfig({datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate});
    this.tooltipControl.updateConfig({
      unitFormat,
      directionType: config.tooltip.directionType,
      directionFormat: config.tooltip.directionFormat,
      followCursorOffset: config.tooltip.followCursorOffset,
      followCursorPlacement: config.tooltip.followCursorPlacement,
    });
    // attributionControl.updateConfig({attribution});
  }
  ;

  get config() {
    return {
      dataset: this._dataset === WEATHER_LAYERS_UTIL.NO_DATA ? '' : this._dataset,
      unitSystem: UnitSystem.METRIC,
      datetimeRange: this.datetimeRange,
      datetime: WEATHER_LAYERS_UTIL.NO_DATA,
      datetimeInterpolate: true,
      imageSmoothing: 0,
      imageInterpolation: ImageInterpolation.CUBIC, // TODO Enrique: if deckgl
      imageMinValue: 0, // dataset-specific
      imageMaxValue: 0, // dataset-specific
      raster: {
        enabled: true, // TODO Enrique: Couldn't find when it's disabled
        opacity: 0.2
      },
      contour: {
        enabled: !!CONTOUR_LAYER_DATASET_CONFIG[this._dataset],
        interval: CONTOUR_LAYER_DATASET_CONFIG[this._dataset]?.interval || 2, // dataset-specific
        majorInterval: CONTOUR_LAYER_DATASET_CONFIG[this._dataset]?.majorInterval || 10, // dataset-specific
        width: DEFAULT_LINE_WIDTH,
        color: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_LINE_COLOR),
        palette: false,
        // text config is used for labels in standalone demos
        textFontFamily: DEFAULT_TEXT_FONT_FAMILY,
        textSize: DEFAULT_TEXT_SIZE,
        textColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_TEXT_COLOR),
        textOutlineWidth: DEFAULT_TEXT_OUTLINE_WIDTH,
        textOutlineColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_TEXT_OUTLINE_COLOR),
        opacity: 0.2,
      },
      highLow: {
        enabled: !!HIGH_LOW_LAYER_DATASET_CONFIG[this._dataset],
        radius: HIGH_LOW_LAYER_DATASET_CONFIG[this._dataset]?.radius, // dataset-specific
        textFontFamily: DEFAULT_TEXT_FONT_FAMILY,
        textSize: DEFAULT_TEXT_SIZE,
        textColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_TEXT_COLOR),
        textOutlineWidth: DEFAULT_TEXT_OUTLINE_WIDTH,
        textOutlineColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_TEXT_OUTLINE_COLOR),
        palette: false,
        opacity: 0.2,
      },
      grid: { // TODO Enrique: if deckgl
        enabled: !!GRID_LAYER_DATASET_CONFIG[this._dataset],
        style: GRID_LAYER_DATASET_CONFIG[this._dataset]?.style || GridStyle.VALUE, // dataset-specific
        density: 0,
        textFontFamily: DEFAULT_TEXT_FONT_FAMILY,
        textSize: DEFAULT_TEXT_SIZE,
        textColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_TEXT_COLOR),
        textOutlineWidth: DEFAULT_TEXT_OUTLINE_WIDTH,
        textOutlineColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_TEXT_OUTLINE_COLOR),
        iconBounds: GRID_LAYER_DATASET_CONFIG[this._dataset]?.iconBounds || null, // dataset-specific
        iconSize: DEFAULT_ICON_SIZE,
        iconColor: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_ICON_COLOR),
        palette: false,
        opacity: 0.2,
      },
      particle: { // TODO Enrique: if webgl2
        enabled: !!PARTICLE_LAYER_DATASET_CONFIG[this._dataset],
        numParticles: 5000,
        maxAge: 10,
        speedFactor: PARTICLE_LAYER_DATASET_CONFIG[this._dataset]?.speedFactor || 0, // dataset-specific
        width: PARTICLE_LAYER_DATASET_CONFIG[this._dataset]?.width || 0, // dataset-specific
        color: WEATHER_LAYERS_UTIL.colorToCss(DEFAULT_LINE_COLOR),
        palette: false,
        opacity: 0.2,
        animate: true,
      },
      tooltip: {
        directionType: TOOLTIP_CONTROL_DATASET_CONFIG[this._dataset]?.directionType || DirectionType.INWARD, // dataset-specific
        directionFormat: DirectionFormat.CARDINAL3,
        followCursorOffset: 16,
        followCursorPlacement: Placement.BOTTOM,
      },
    }
  }

  override getLayerId() {
    return 'weather-openLayers-' + Date.now();
  }

  override setLayerVisibility() {
    // TODO Enrique: Implement
  }

  override removeSelfLayer() {
    // TODO Enrique: Implement
  }

  constructor(@Inject(NGX_WEATHER_LAYER_CONFIG) private weatherLayerConfig: WeatherLayersConfigToken) {
    super();
    this.weatherLayersClient = new Client({
      accessToken: weatherLayerConfig.weatherLayersAccessToken,
    });
  }

  ngOnInit() {
    this.initLayer();
  }

  private async initLayer() {
    const datasets = await this.weatherLayersClient.loadCatalog();
    this.weatherLayerConfig.debug && console.log('\x1B[46;30m Available Datasets: ', JSON.stringify(datasets, null, 2));

    // TODO Enrique: This has to be moved to a base layer component!
    this.ngxMapCore.insertLayer(new TileLayer({source: new XYZ({url: BASEMAP_RASTER_STYLE_URL}), maxZoom: 22}));

    /**
     * overlaid deck.gl
     * see https://github.com/visgl/deck.gl/blob/8.9-release/examples/get-started/pure-js/openlayers/app.js
     * updated to support picking
     */
      // TODO Enrique: CONFIRM - Using new div?
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';

    // Because it is the OpenLayers implementation, we are going to create its own instance of Deck.gl.
    this.deckInstance = new Deck({
      parent: element,
      initialViewState: {longitude: 0, latitude: 0, zoom: 1}, // This is not meaningful since the render function would immediately set something else
      controller: false,
      views: [
        new MapView({repeat: true}),
      ],
      layers: [],
    });
    this.ngxMapCore.mapCore.addControl(new Control({element}));
    this.ngxMapCore.insertLayer(new Layer({
      render: ({size, viewState}) => {
        const [width, height] = size;
        const [longitude, latitude] = toLonLat(viewState.center);
        const zoom = viewState.zoom - 1;
        const bearing = (-viewState.rotation * 180) / Math.PI;
        const deckViewState = {bearing, longitude, latitude, zoom};
        this.deckInstance.setProps({width, height, viewState: deckViewState});
        this.deckInstance.redraw();
        return element;
      }
    }));
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointerdown', event => {
      this.deckInstance._onPointerDown({
        // @ts-ignore
        type: event.type,
        srcEvent: event,
        offsetCenter: {x: event.offsetX / window.devicePixelRatio, y: event.offsetY / window.devicePixelRatio},
        leftButton: event.buttons === 1,
        rightButton: event.buttons === 2
      });
    });
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointermove', event => {
      this.deckInstance._onPointerMove({
        // @ts-ignore
        type: event.type,
        srcEvent: event,
        offsetCenter: {x: event.offsetX / window.devicePixelRatio, y: event.offsetY / window.devicePixelRatio},
        leftButton: event.buttons === 1,
        rightButton: event.buttons === 2
      });
    });
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointerleave', event => {
      this.deckInstance._onPointerMove({
        // @ts-ignore
        type: event.type,
        srcEvent: event
      });
    });

    // tooltip
    this.tooltipControl = new TooltipControl({
      followCursor: true,
      unitFormat: {unit: 'm', system: UnitSystem.METRIC}
    });
    this.tooltipControl.addTo(this.deckInstance.getCanvas()!.parentElement!);
    this.deckInstance.setProps({onHover: event => this.tooltipControl.updatePickingInfo(event)});

    return this.update();
  }
}
