import { TestBed } from '@angular/core/testing';

import { StrategyUtilsService } from './strategy-utils.service';

describe('StrategyUtilsService', () => {
  let service: StrategyUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
