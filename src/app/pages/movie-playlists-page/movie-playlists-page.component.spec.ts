import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePlayListsPageComponent } from './movie-playlists-page.component';

describe('MovieListPageComponent', () => {
  let component: MoviePlayListsPageComponent;
  let fixture: ComponentFixture<MoviePlayListsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePlayListsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePlayListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
