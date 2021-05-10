import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdnComponent } from './all-adn.component';

describe('AllAdnComponent', () => {
  let component: AllAdnComponent;
  let fixture: ComponentFixture<AllAdnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
