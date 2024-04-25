import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSidePanelComponent } from './map-side-panel.component';

describe('MapSidePanelComponent', () => {
  let component: MapSidePanelComponent;
  let fixture: ComponentFixture<MapSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSidePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
