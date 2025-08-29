import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureUpload } from './signature-upload';

describe('SignatureUpload', () => {
  let component: SignatureUpload;
  let fixture: ComponentFixture<SignatureUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignatureUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
