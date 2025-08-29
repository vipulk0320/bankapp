import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelector } from './country-selector';

describe('CountrySelector', () => {
  let component: CountrySelector;
  let fixture: ComponentFixture<CountrySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
