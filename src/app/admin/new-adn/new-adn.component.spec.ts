import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdnComponent } from './new-adn.component';

describe('NewAdnComponent', () => {
  let component: NewAdnComponent;
  let fixture: ComponentFixture<NewAdnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
