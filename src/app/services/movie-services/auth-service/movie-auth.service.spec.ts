import { TestBed } from '@angular/core/testing';

import { MovieAuthService } from './movie-auth.service';

describe('MovieAuthService', () => {
  let service: MovieAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
