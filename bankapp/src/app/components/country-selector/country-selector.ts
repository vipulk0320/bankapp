import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './country-selector.html',
  styleUrls: ['./country-selector.css']
})
export class CountrySelectorComponent {
  countries: string[] = [
    'Botswana', 'Ghana', 'Seychelles', 'Mauritius',
    'Zambia', 'Tanzania', 'Uganda', 'Kenya', 'Mozambique'
  ];
  selectedCountry: string = '';

  @Output() countrySelected = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.selectedCountry);
  }

  onCountryChange(): void {
    this.countrySelected.emit(this.selectedCountry);
  }

  onNext(): void {
    this.countrySelected.emit(this.selectedCountry);
    this.router.navigate(['/id-verification']);
  }
}