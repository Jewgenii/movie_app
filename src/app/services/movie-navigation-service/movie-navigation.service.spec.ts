import { TestBed } from '@angular/core/testing';

import { MovieNavigationService } from './movie-navigation.service';

describe('MovieCardOpenerService', () => {
  let service: MovieNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
