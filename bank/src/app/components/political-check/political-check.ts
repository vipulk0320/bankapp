import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-political-check',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './political-check.html',
  styleUrls: ['./political-check.css']
})
export class PoliticalCheckComponent {
  isPoliticallyConnected: string = '';

  constructor(private router: Router) {}

  onNext(): void {
    if (this.isPoliticallyConnected) {
      console.log('Political connection status:', this.isPoliticallyConnected);
      this.router.navigate(['/document-upload']);
    }
  }
}