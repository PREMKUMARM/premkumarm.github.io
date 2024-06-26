import { TestBed } from '@angular/core/testing';

import { AuthTokenApiService } from './auth-token-api.service';

describe('AuthTokenApiService', () => {
  let service: AuthTokenApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
