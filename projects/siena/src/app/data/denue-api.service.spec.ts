import { TestBed } from '@angular/core/testing';

import { DENUEApiService } from './denua-api.service';

describe('DenuaApiService', () => {
  let service: DENUEApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DENUEApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
