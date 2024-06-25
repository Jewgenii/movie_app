import { TestBed } from '@angular/core/testing';

import { MovieCardOpenerService } from './movie-card-opener.service';

describe('MovieCardOpenerService', () => {
  let service: MovieCardOpenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCardOpenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
