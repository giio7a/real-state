import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BamaCoverageComponent} from './bama-coverage.component';

describe('BamaCoverageComponent', () => {
  let component: BamaCoverageComponent;
  let fixture: ComponentFixture<BamaCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BamaCoverageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BamaCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
