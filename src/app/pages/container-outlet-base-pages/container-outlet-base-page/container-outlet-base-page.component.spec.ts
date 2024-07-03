import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerOutletBasePageComponent } from './container-outlet-base-page.component';

describe('ContainerOutletBasePageComponent', () => {
  let component: ContainerOutletBasePageComponent;
  let fixture: ComponentFixture<ContainerOutletBasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerOutletBasePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerOutletBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
