import {Directive, input, OnDestroy, OnInit, output} from '@angular/core';
import {Feature, Map, MapBrowserEvent} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style} from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import {Point} from 'ol/geom';
import {Coordinate} from 'ol/coordinate';
import {NgxMapLayer} from '../architecture/ngx-map-layer';
import {transform} from 'ol/proj';
import {ProjectionSettings} from '../settings/projection-settings';

@Directive({
  selector: '[nidMapLocationSelector]',
  standalone: true,
})
export class MapLocationSelector extends NgxMapLayer<Map> implements OnDestroy, OnInit {
  map = input.required<Map>();
  /**
   * Return selected location on Map in {@link ProjectionSettings.WORLD_GEODETIC_SYSTEM}
   */
  selectedLocationChange = output<Coordinate>();

  private readonly positionIndicatorStyle = new Style({
    image: new CircleStyle({radius: 6, fill: new Fill({color: 'red'}), stroke: new Stroke({color: 'white', width: 2})}),
  });
  private readonly positionIndicatorFeature = new Feature();

  private clickCallback = (event: MapBrowserEvent<PointerEvent>) => {
    const coordinate = event.map.getCoordinateFromPixel(event.pixel);
    this.positionIndicatorFeature.setGeometry(new Point(coordinate));
    this.selectedLocationChange.emit(
      transform(coordinate, ProjectionSettings.SPHERICAL_MERCATOR, ProjectionSettings.WORLD_GEODETIC_SYSTEM),
    );
  };

  private locationSelectorSource = new VectorSource();
  private locationSelectorLayer = new VectorLayer({source: this.locationSelectorSource});

  ngOnInit() {
    this.map().on('click', this.clickCallback);
    this.initializeLocationSelectorLayerData();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.map().un('click', this.clickCallback);
  }

  getLayerId(): string {
    return 'location-selector';
  }

  protected removeSelfLayer(): void {
    this.map().removeLayer(this.locationSelectorLayer);
    this.locationSelectorSource.dispose();
    this.locationSelectorLayer.dispose();
  }

  protected setLayerVisibility(isVisible: boolean): void {}

  private initializeLocationSelectorLayerData() {
    this.map().addLayer(this.locationSelectorLayer);
    this.positionIndicatorFeature.setStyle(this.positionIndicatorStyle);
    this.locationSelectorSource.addFeature(this.positionIndicatorFeature);
  }
}
