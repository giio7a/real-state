import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Map, View} from 'ol';

@Component({
  selector: 'nid-ngx-open-layers-core',
  standalone: true,
  imports: [],
  templateUrl: './ngx-open-layers-core.component.html',
  styleUrl: './ngx-open-layers-core.component.scss'
})
export class NgxOpenLayersCoreComponent implements OnInit {

  mapCore: any | undefined; // TODO Enrique: Implement type
  cursorInMap: boolean = false;

  @ViewChild('olMap', {static: true}) olMapElement!: ElementRef<HTMLDivElement>;

  constructor() {
  }

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    this.mapCore = new Map({
      target: this.olMapElement.nativeElement,
      view: new View({
        center: [0, 0],
        zoom: 10,
      })
    })
  }
}
