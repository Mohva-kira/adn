import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnBtwdatesReportDetailComponent } from './adn-btwdates-report-detail.component';

describe('AdnBtwdatesReportDetailComponent', () => {
  let component: AdnBtwdatesReportDetailComponent;
  let fixture: ComponentFixture<AdnBtwdatesReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnBtwdatesReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnBtwdatesReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
