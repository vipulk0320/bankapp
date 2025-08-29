import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPdf } from './summary-pdf';

describe('SummaryPdf', () => {
  let component: SummaryPdf;
  let fixture: ComponentFixture<SummaryPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
