import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdVerification } from './id-verification';

describe('IdVerification', () => {
  let component: IdVerification;
  let fixture: ComponentFixture<IdVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
