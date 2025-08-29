import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankDetails } from './view-bank-details';

describe('ViewBankDetails', () => {
  let component: ViewBankDetails;
  let fixture: ComponentFixture<ViewBankDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBankDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBankDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
