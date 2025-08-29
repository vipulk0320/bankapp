import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
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
    MatButtonToggleModule
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

  // Search state
  searchOpen = false;
  searchTerm = '';
  searchColumn: 'name' | 'email' | 'ref' | 'date' | '' = '';

  // Filters
  dateRangeStart: Date | null = null;
  dateRangeEnd: Date | null = null;
  dobSelected: Date | null = null;
  activeFilter: 'date' | 'dob' | '' = '';

  @ViewChild('viewDialog', { static: true }) viewDialogTpl!: TemplateRef<any>;
  @ViewChild('deleteDialog', { static: true }) deleteDialogTpl!: TemplateRef<any>;
  @ViewChild('filterDialog', { static: true }) filterDialogTpl!: TemplateRef<any>;
  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updatePagination();
  }

  // Open column search
  openSearch(column: 'name' | 'email' | 'ref' | 'date'): void {
    if (this.searchColumn === column && this.searchOpen) {
      this.clearSearch();
      return;
    }
    this.searchOpen = true;
    this.searchColumn = column;
    this.searchTerm = '';
    setTimeout(() => this.searchInputRef?.nativeElement?.focus(), 0);
  }

  onSearchInput(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchOpen = false;
    this.searchColumn = '';
    this.applyFilters();
  }

  // Dialogs
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

  // Apply search and filters
  applyFilters(): void {
    let res = [...this.records];

    // Column search
    if (this.searchOpen && this.searchTerm.trim() && this.searchColumn) {
      const term = this.searchTerm.toLowerCase();
      res = res.filter(r => {
        switch (this.searchColumn) {
          case 'name': return `${r.firstName} ${r.lastName}`.toLowerCase().includes(term);
          case 'email': return r.email.toLowerCase().includes(term);
          case 'ref': return r.refNumber.toLowerCase().includes(term);
          case 'date': return !!r.date && this.matchesDateSearch(r.date, term);
          default: return true;
        }
      });
    }

    // Date range filter
    if (this.activeFilter === 'date' && this.dateRangeStart && this.dateRangeEnd) {
      const start = new Date(this.dateRangeStart); start.setHours(0,0,0,0);
      const end = new Date(this.dateRangeEnd); end.setHours(23,59,59,999);
      res = res.filter(r => {
        if (!r.date) return false;
        const d = new Date(r.date); d.setHours(0,0,0,0);
        return d >= start && d <= end;
      });
    }

    // DOB filter
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

  getSearchLabel(): string {
    switch (this.searchColumn) {
      case 'name': return 'Name';
      case 'email': return 'Email';
      case 'ref': return 'Ref #';
      case 'date': return 'Date';
      default: return '';
    }
  }

  getSearchPlaceholder(): string {
    switch (this.searchColumn) {
      case 'name': return 'Type a first or last name';
      case 'email': return 'Type an email';
      case 'ref': return 'Type a reference number';
      case 'date': return 'Type month, day or year (e.g., Jan, January, 2024)';
      default: return '';
    }
  }

  private matchesDateSearch(dateValue: string | Date, term: string): boolean {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return false;

    const monthNames = [
      'january','february','march','april','may','june',
      'july','august','september','october','november','december'
    ];
    const monthShort = [
      'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
    ];

    const m = d.getMonth();
    const y = d.getFullYear();
    const day = d.getDate();
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');

    const tokens = [
      d.toLocaleDateString().toLowerCase(),
      d.toDateString().toLowerCase(),
      `${y}`, `${day}`, dd, `${m+1}`, mm,
      monthNames[m], monthShort[m],
      `${monthNames[m]} ${y}`,
      `${monthShort[m]} ${y}`,
      `${mm}/${dd}/${y}`,
      `${y}-${mm}-${dd}`,
      `${monthNames[m]} ${day}, ${y}`.toLowerCase(),
      `${monthShort[m]} ${day}, ${y}`.toLowerCase()
    ];

    const parts = term.split(/\s+/).filter(Boolean);
    return parts.every(p => tokens.some(t => t.includes(p)));
  }

  async downloadRecord(record: PersonRecord) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    let y = 20;

    pdf.setFontSize(16);
    pdf.setTextColor(244, 81, 32);
    pdf.text("Bank Details", pdf.internal.pageSize.getWidth() / 2, y, { align: "center" });

    y += 15;
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);

    pdf.text(`Name: ${record.firstName} ${record.lastName}`, margin, y); y += 10;
    pdf.text(`Email: ${record.email}`, margin, y); y += 10;
    pdf.text(`Reference Number: ${record.refNumber}`, margin, y); y += 10;
    pdf.text(`Phone: ${record.phoneNumber}`, margin, y); y += 10;

    if (record.date) {
      const dateStr = new Date(record.date).toLocaleDateString();
      pdf.text(`Date: ${dateStr}`, margin, y); y += 10;
    }

    if (record.dob) {
      const dobStr = new Date(record.dob).toLocaleDateString();
      pdf.text(`DOB: ${dobStr}`, margin, y); y += 10;
    }

    if (record.nationalId) {
      pdf.text(`National ID: ${record.nationalId}`, margin, y); y += 10;
    }

    if (record.address) {
      const splitAddress = pdf.splitTextToSize(`Address: ${record.address}`, 180);
      pdf.text(splitAddress, margin, y);
      y += splitAddress.length * 7;
    }

    pdf.save(`${record.firstName}_${record.lastName}_BankDetails.pdf`);
  }
}
