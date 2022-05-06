import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnWaitingComponent } from './adn-waiting.component';

describe('AdnWaitingComponent', () => {
  let component: AdnWaitingComponent;
  let fixture: ComponentFixture<AdnWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnWaitingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
