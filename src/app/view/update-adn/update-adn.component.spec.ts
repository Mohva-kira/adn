import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdnComponent } from './update-adn.component';

describe('UpdateAdnComponent', () => {
  let component: UpdateAdnComponent;
  let fixture: ComponentFixture<UpdateAdnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
