import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnValidatedComponent } from './adn-validated.component';

describe('AdnValidatedComponent', () => {
  let component: AdnValidatedComponent;
  let fixture: ComponentFixture<AdnValidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnValidatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
