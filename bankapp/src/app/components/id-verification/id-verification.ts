import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-id-verification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './id-verification.html',
  styleUrls: ['./id-verification.css']
})
export class IdVerificationComponent {
  passportId: string = '';
  passportExists: boolean | null = null;

  constructor(private router: Router) {}

  verifyPassport(): void {
    const existingPassports = ['A1234567', 'B9876543', 'C1122334'];
    this.passportExists = existingPassports.includes(this.passportId);

    this.router.navigate(['/customer-info']);
  }
}
