import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signature-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './signature-upload.html',
  styleUrls: ['./signature-upload.css']
})
export class SignatureUploadComponent {
  uploadedSignature: File | null = null;

  constructor(private router: Router) {}

  onSignatureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedSignature = input.files[0];
      console.log('Signature file selected:', this.uploadedSignature.name);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('signatureInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onNext(): void {
    if (this.uploadedSignature) {
      // You can store the signature in a service or send to backend
      this.router.navigate(['/summary-pdf']);
    }
  }
}