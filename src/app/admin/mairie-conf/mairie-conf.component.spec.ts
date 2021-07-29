import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MairieConfComponent } from './mairie-conf.component';

describe('MairieConfComponent', () => {
  let component: MairieConfComponent;
  let fixture: ComponentFixture<MairieConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MairieConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MairieConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
