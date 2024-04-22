import {Directive, OnInit} from '@angular/core';
import {NgxMapLayer} from '@nidiro/ngx-map-core'
import {Layer} from 'ol/layer';
import {toLonLat} from 'ol/proj';
import {Map} from 'ol'
import {Deck, MapView} from '@deck.gl/core/typed';
import {ClipExtension} from '@deck.gl/extensions/typed';
import * as WeatherLayers from 'weatherlayers-gl';
import {UnitSystem} from 'weatherlayers-gl';
import * as WeatherLayersClient from 'weatherlayers-gl/client';
import {cssToColor, initConfig, initGui, isMetalWebGl2, NO_DATA} from './config';
import {BASEMAP_RASTER_STYLE_URL} from './basemap';
import {XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {Control} from 'ol/control';

@Directive({
  selector: '[nidOpenLayersWeatherLayer]',
  standalone: true,
})
export class NgxOpenLayersWeatherDirective extends NgxMapLayer<Map> implements OnInit {

  override getLayerId() {
    return 'weather-deck.js'
  }

  override setLayerVisibility() {
    // TODO Enrique: Implement
  }

  override removeSelfLayer() {
    // TODO Enrique: Implement
  }

  constructor() {
    super();
    console.log('\x1B[46;30m Weather Directive');
  }

  ngOnInit() {
    this.initLayer();
  }

  private async initLayer() {
    const datetimeRange = WeatherLayers.offsetDatetimeRange(new Date().toISOString(), -24, 24);
    const client = new WeatherLayersClient.Client({
      accessToken: 'aECrzm2nNuVH1VsGjUk1', // TODO Enrique: Store
    });

    const datasets = await client.loadCatalog();
    const config = await initConfig({datasets, deckgl: true, webgl2: true, globe: ''});
    let gui;
    // OpenLayers
    // const map = new ol.Map({
    //   target: document.getElementById('openlayers'),
    //   controls: [],
    //   view: new ol.View({
    //     center: ol.proj.fromLonLat([30, 10]),
    //     zoom: 0,
    //   }),
    //   layers: [],
    // });
    this.ngxMapCore.insertLayer(new TileLayer({source: new XYZ({url: BASEMAP_RASTER_STYLE_URL}), maxZoom: 22}));

    // overlaid deck.gl
    // see https://github.com/visgl/deck.gl/blob/8.9-release/examples/get-started/pure-js/openlayers/app.js
    // updated to support picking
    // TODO Enrique: CONFIRM - Using new div?
    const element = document.createElement('div');
    element.style.pointerEvents = 'none';
    const deckgl = new Deck({
      parent: element,
      initialViewState: {longitude: 0, latitude: 0, zoom: 1},
      controller: false,
      views: [
        new MapView({repeat: true}),
      ],
      layers: [],
    });
    this.ngxMapCore.mapCore.addControl(new Control({
      element: element,
    }));
    this.ngxMapCore.mapCore.addLayer(new Layer({
      // @ts-ignore
      render({size, viewState}) {
        const [width, height] = size;
        const [longitude, latitude] = toLonLat(viewState.center);
        const zoom = viewState.zoom - 1;
        const bearing = (-viewState.rotation * 180) / Math.PI;
        const deckViewState = {bearing, longitude, latitude, zoom};
        deckgl.setProps({width, height, viewState: deckViewState});
        deckgl.redraw();
      }
    }));
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointerdown', event => {
      deckgl._onPointerDown({
        // @ts-ignore
        type: event.type,
        srcEvent: event,
        offsetCenter: {x: event.offsetX / window.devicePixelRatio, y: event.offsetY / window.devicePixelRatio},
        leftButton: event.buttons === 1,
        rightButton: event.buttons === 2
      });
    });
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointermove', event => {
      deckgl._onPointerMove({
        // @ts-ignore
        type: event.type,
        srcEvent: event,
        offsetCenter: {x: event.offsetX / window.devicePixelRatio, y: event.offsetY / window.devicePixelRatio},
        leftButton: event.buttons === 1,
        rightButton: event.buttons === 2
      });
    });
    this.ngxMapCore.mapCore.getViewport().addEventListener('pointerleave', event => {
      deckgl._onPointerMove({
        // @ts-ignore
        type: event.type,
        srcEvent: event
      });
    });

    // TODO Enrique: Controls!
    // info panels
    // const infoControl = new InfoControl();
    // infoControl.prependTo(document.getElementById('top-left'));
    // deckgl.setProps({onViewStateChange: ({viewState}) => infoControl.update(viewState)});
    //
    // // logo
    // const logoControl = new WeatherLayers.LogoControl();
    // logoControl.prependTo(document.getElementById('bottom-left'));
    //
    // // legend
    // const legendControl = new WeatherLayers.LegendControl();
    // legendControl.prependTo(document.getElementById('bottom-left'));
    //
    // // timeline
    // const timelineControl = new WeatherLayers.TimelineControl({
    //   onPreload: datetimes => Promise.all(datetimes.map(datetime => client.loadDatasetData(config.dataset, datetime))),
    //   onUpdate: datetime => {
    //     config.datetime = datetime || NO_DATA;
    //     update();
    //   },
    // });
    // timelineControl.prependTo(document.getElementById('bottom-left'));

    // tooltip
    const tooltipControl = new WeatherLayers.TooltipControl({
      followCursor: true,
      unitFormat: {unit: 'm', system: UnitSystem.METRIC}
    });
    tooltipControl.addTo(deckgl.getCanvas()!.parentElement!);
    deckgl.setProps({onHover: event => tooltipControl.updatePickingInfo(event)});

    // attribution
    // const basemapAttributionControl = new WeatherLayers.AttributionControl({attribution: BASEMAP_ATTRIBUTION});
    // basemapAttributionControl.prependTo(document.getElementById('bottom-right'));
    // const attributionControl = new WeatherLayers.AttributionControl();
    // attributionControl.prependTo(document.getElementById('bottom-right'));

    // FPS meter
    // const fpsControl = new FpsControl();
    // fpsControl.prependTo(document.getElementById('bottom-right'));

    // config
    async function update() {
      const dataset = config.dataset !== NO_DATA ? config.dataset : '';
      const {
        title,
        unitFormat,
        attribution,
        palette
      } = await client.loadDataset(dataset, {unitSystem: config.unitSystem});
      const {datetimes} = await client.loadDatasetSlice(dataset, datetimeRange);
      const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] ? config.datetime : datetimes[0];
      const {
        image,
        image2,
        imageWeight,
        imageType,
        imageUnscale,
        bounds
      } = await client.loadDatasetData(dataset, datetime, {datetimeInterpolate: config.datetimeInterpolate});

      (config as any).datetimes = datetimes;
      config.datetime = datetime;

      const raster = new WeatherLayers.RasterLayer({
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
        pickable: !isMetalWebGl2(),
        extensions: [new ClipExtension()],
        clipBounds: [-181, -85.051129, 181, 85.051129],
      });
      const contour = new WeatherLayers.ContourLayer({
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
        color: cssToColor(config.contour.color) as any,
        palette: config.contour.palette ? palette : null,
        opacity: config.contour.opacity,
        extensions: [new ClipExtension()],
        clipBounds: [-181, -85.051129, 181, 85.051129],
      })
      const highLow = new WeatherLayers.HighLowLayer({
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
        textColor: cssToColor(config.highLow.textColor) as any,
        textOutlineColor: cssToColor(config.highLow.textOutlineColor) as any,
        palette: config.highLow.palette ? palette : null,
        textOutlineWidth: config.highLow.textOutlineWidth,
        opacity: config.highLow.opacity,
      });
      const grid = new WeatherLayers.GridLayer({
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
        textColor: cssToColor(config.grid?.textColor) as any,
        textOutlineWidth: config.grid?.textOutlineWidth,
        textOutlineColor: cssToColor(config.grid?.textOutlineColor) as any,
        iconBounds: config.grid?.iconBounds,
        iconSize: config.grid?.style === WeatherLayers.GridStyle.ARROW ? [config.grid.iconSize / 8, config.grid.iconSize] : config.grid?.iconSize,
        iconColor: cssToColor(config.grid?.iconColor) as any,
        palette: config.grid?.palette ? palette : null,
        opacity: config.grid?.opacity,
      })
      const particle = new WeatherLayers.ParticleLayer({
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
        color: cssToColor(config.particle?.color) as any,
        palette: config.particle?.palette ? palette : null,
        opacity: config.particle?.opacity,
        animate: config.particle?.animate,
        extensions: [new ClipExtension()],
        clipBounds: [-181, -85.051129, 181, 85.051129],
        getPolygonOffset: () => [0, -1000],
      })
      deckgl.setProps({
        layers: [raster, contour, highLow, grid, particle],
      });

      // legendControl.updateConfig({title, unitFormat, palette});
      // timelineControl.updateConfig({datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate});
      tooltipControl.updateConfig({
        unitFormat,
        directionType: config.tooltip.directionType,
        directionFormat: config.tooltip.directionFormat,
        followCursorOffset: config.tooltip.followCursorOffset,
        followCursorPlacement: config.tooltip.followCursorPlacement,
      });
      // attributionControl.updateConfig({attribution});
    }

    await update();
    gui = initGui(config, update, {deckgl, webgl2: true, globe: ''});
  }
}
