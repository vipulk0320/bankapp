import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalCheck } from './political-check';

describe('PoliticalCheck', () => {
  let component: PoliticalCheck;
  let fixture: ComponentFixture<PoliticalCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticalCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalCheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
