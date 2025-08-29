import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Angular Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { PEOPLE } from '../../data/people.data';
import { PersonRecord } from '../../models/PersonRecord';

import jsPDF from 'jspdf';

@Component({
  selector: 'view-bank-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonToggleModule // ✅ FIX
  ],
  templateUrl: './view-bank-details.html',
  styleUrls: ['./view-bank-details.css']
})
export class ViewBankDetails implements OnInit {
  records: PersonRecord[] = PEOPLE;
  filteredPeople: PersonRecord[] = [...this.records];
  paginatedPeople: PersonRecord[] = [];

  displayedColumns: string[] = ['name', 'email', 'refNumber', 'date', 'actions'];
  currentPage = 0;
  pageSize = 5;

  searchOpen = false;
  searchTerm = '';

  dateRangeStart: Date | null = null;
  dateRangeEnd: Date | null = null;
  dobSelected: Date | null = null;

  activeFilter: 'date' | 'dob' | '' = '';

  @ViewChild('viewDialog', { static: true }) viewDialogTpl!: TemplateRef<any>;
  @ViewChild('deleteDialog', { static: true }) deleteDialogTpl!: TemplateRef<any>;
  @ViewChild('filterDialog', { static: true }) filterDialogTpl!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updatePagination();
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen && this.searchTerm) {
      this.searchTerm = '';
      this.applyFilters();
    }
  }

  onSearchInput(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchOpen = false;
    this.applyFilters();
  }

  openView(record: PersonRecord): void {
    this.dialog.open(this.viewDialogTpl, {
      data: record,
      width: '520px',
      panelClass: 'dialog-rounded'
    });
  }

  confirmDelete(record: PersonRecord): void {
    const ref = this.dialog.open(this.deleteDialogTpl, {
      data: record,
      width: '420px',
      panelClass: 'dialog-rounded'
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.records = this.records.filter(r => r.id !== record.id);
        this.applyFilters();
      }
    });
  }

  openFilters(): void {
    this.dialog.open(this.filterDialogTpl, {
      width: '560px',
      panelClass: 'dialog-rounded'
    });
  }

  applyFilters(): void {
    let res = [...this.records];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      res = res.filter(r =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.refNumber.toLowerCase().includes(term)
      );
    }

    if (this.activeFilter === 'date' && this.dateRangeStart && this.dateRangeEnd) {
      const start = new Date(this.dateRangeStart); start.setHours(0,0,0,0);
      const end = new Date(this.dateRangeEnd); end.setHours(23,59,59,999);
      res = res.filter(r => {
        if (!r.date) return false;
        const d = new Date(r.date); d.setHours(12,0,0,0);
        return d >= start && d <= end;
      });
    }

    if (this.activeFilter === 'dob' && this.dobSelected) {
      const dob = new Date(this.dobSelected);
      dob.setHours(0,0,0,0);
      res = res.filter(r => {
        if (!r.dob) return false;
        const rd = new Date(r.dob);
        rd.setHours(0,0,0,0);
        return rd.getTime() === dob.getTime();
      });
    }

    this.filteredPeople = res;
    this.currentPage = 0;
    this.updatePagination();
  }

  clearFilters(): void {
    this.dateRangeStart = null;
    this.dateRangeEnd = null;
    this.dobSelected = null;
    this.activeFilter = '';
    this.applyFilters();
  }

  pageChanged(ev: PageEvent): void {
    this.currentPage = ev.pageIndex;
    this.pageSize = ev.pageSize;
    this.updatePagination();
  }

  private updatePagination(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPeople = this.filteredPeople.slice(start, end);
    if (!this.paginatedPeople.length && this.currentPage > 0) {
      this.currentPage = 0;
      this.updatePagination();
    }
  }

  fullName(r: PersonRecord): string {
    return `${r.firstName} ${r.lastName}`;
  }

  // ✅ Final clean version: ONLY ONE downloadRecord()
  async downloadRecord(record: PersonRecord) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    let y = 20;

    pdf.setFontSize(16);
    pdf.setTextColor(244, 81, 32); // #f45120 theme
    pdf.text("Bank Details", pdf.internal.pageSize.getWidth() / 2, y, { align: "center" });

    y += 15;
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);

    pdf.text(`Name: ${record.firstName} ${record.lastName}`, margin, y); y += 10;
    pdf.text(`Email: ${record.email}`, margin, y); y += 10;
    pdf.text(`Reference Number: ${record.refNumber}`, margin, y); y += 10;

    if (record.date) {
      const dateStr = new Date(record.date).toLocaleDateString();
      pdf.text(`Date: ${dateStr}`, margin, y);
      y += 10;
    }

    if (record.dob) {
      const dobStr = new Date(record.dob).toLocaleDateString();
      pdf.text(`DOB: ${dobStr}`, margin, y);
      y += 10;
    }

    if (record.address) {
      const splitAddress = pdf.splitTextToSize(`Address: ${record.address}`, 180);
      pdf.text(splitAddress, margin, y);
      y += splitAddress.length * 7;
    }

    pdf.save(`${record.firstName}_${record.lastName}_BankDetails.pdf`);
  }
}
