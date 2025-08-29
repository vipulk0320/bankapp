import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-summary-pdf',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './summary-pdf.html',
  styleUrls: ['./summary-pdf.css']
})
export class SummaryPdfComponent {
  constructor(private router: Router) {}

  customerInfo = {
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City, Country'
  };

  selectedProduct = 'Loan';
  politicalStatus = 'No';
  uploadedDocuments = ['passport.pdf', 'income_statement.pdf'];
  signatureFile = 'signature.png';

  downloadPDF(): void {
    const element = document.getElementById('summaryContent');
    if (!element) return;

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('BankApplicationSummary.pdf');
    });
  }

  submitApplication(): void {
    this.router.navigate(['/submit']);
  }
}