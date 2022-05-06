import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnFormComponent } from './adn-form.component';

describe('AdnFormComponent', () => {
  let component: AdnFormComponent;
  let fixture: ComponentFixture<AdnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
