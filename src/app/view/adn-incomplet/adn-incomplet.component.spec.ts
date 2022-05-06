import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnIncompletComponent } from './adn-incomplet.component';

describe('AdnIncompletComponent', () => {
  let component: AdnIncompletComponent;
  let fixture: ComponentFixture<AdnIncompletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnIncompletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnIncompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
