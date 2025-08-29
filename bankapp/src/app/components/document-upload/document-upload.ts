import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './document-upload.html',
  styleUrls: ['./document-upload.css']
})
export class DocumentUploadComponent {
  uploadedFiles: File[] = [];

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFiles = Array.from(input.files);
      console.log('Files selected:', this.uploadedFiles.map(f => f.name));
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onNext(): void {
    if (this.uploadedFiles.length > 0) {
      // You could store these files in a service or upload them to a backend here
      this.router.navigate(['/signature-upload']);
    }
  }
}