import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './customer-info.html',
  styleUrls: ['./customer-info.css']
})
export class CustomerInfoComponent {
  model = {
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    address: ''
  };

  constructor(private router: Router) {}

  onNext(): void {
    this.router.navigate(['/product-selection']);
  }
}
