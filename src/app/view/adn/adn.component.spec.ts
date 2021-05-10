import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnComponent } from './adn.component';

describe('AdnComponent', () => {
  let component: AdnComponent;
  let fixture: ComponentFixture<AdnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
