import { TestBed } from '@angular/core/testing';

import { MockupMovieService } from './mockup-movie-service';

describe('MovieService', () => {
  let service: MockupMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockupMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
