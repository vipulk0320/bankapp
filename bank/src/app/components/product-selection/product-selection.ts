import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './product-selection.html',
  styleUrls: ['./product-selection.css']
})
export class ProductSelectionComponent {
  products: string[] = ['CASA', 'Loan', 'Credit Card', 'Insurance', 'Fixed Deposit'];
  selectedProducts: string[] = [];

  constructor(private router: Router) {}

  toggleProduct(product: string): void {
    const index = this.selectedProducts.indexOf(product);
    if (index === -1) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts.splice(index, 1);
    }
  }

  onNext(): void {
    if (this.selectedProducts.length > 0) {
      // Optionally store or send selected products
      console.log('Selected products:', this.selectedProducts);
      this.router.navigate(['/political-check']);
    }
  }
}