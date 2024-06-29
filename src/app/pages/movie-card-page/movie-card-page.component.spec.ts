import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardPageComponent } from './movie-card-page.component';

describe('MovieDetailsPageComponent', () => {
  let component: MovieCardPageComponent;
  let fixture: ComponentFixture<MovieCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
