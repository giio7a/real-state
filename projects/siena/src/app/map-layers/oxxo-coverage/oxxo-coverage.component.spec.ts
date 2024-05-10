import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OxxoCoverageComponent} from './oxxo-coverage.component';

describe('OxxoCoverageComponent', () => {
  let component: OxxoCoverageComponent;
  let fixture: ComponentFixture<OxxoCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxxoCoverageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OxxoCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
