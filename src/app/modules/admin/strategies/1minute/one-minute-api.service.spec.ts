import { TestBed } from '@angular/core/testing';

import { OneMinuteApiService } from './one-minute-api.service';

describe('OneMinuteApiService', () => {
  let service: OneMinuteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneMinuteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
