import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVoletComponent } from './detail-volet.component';

describe('DetailVoletComponent', () => {
  let component: DetailVoletComponent;
  let fixture: ComponentFixture<DetailVoletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVoletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVoletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
