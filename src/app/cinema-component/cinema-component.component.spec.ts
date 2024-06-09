import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaComponentComponent } from './cinema-component.component';

describe('CinemaComponentComponent', () => {
  let component: CinemaComponentComponent;
  let fixture: ComponentFixture<CinemaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CinemaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
