import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './submit.html',
  styleUrls: ['./submit.css']
})
export class SubmitComponent {
  submittedDate: string;
  submittedTime: string;
  referenceNumber: string;

  constructor() {
    const now = new Date();
    this.submittedDate = this.formatDate(now); // e.g., "25 August 2025"
    this.submittedTime = this.formatTime(now); // e.g., "4:37 PM"
    this.referenceNumber = this.generateReferenceNumber();
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  generateReferenceNumber(): string {
    const timestamp = Date.now().toString();
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REF-${timestamp}-${randomSuffix}`;
  }
}