import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.html',
  styleUrls: ['./stepper.css'],
  standalone: true,
  imports: [CommonModule, MatStepperModule]
})
export class StepperComponent {
  steps = [
    'Select Country',
    'Id Verification',
    'Customer Info',
    'Product Select',
    'Document Upload',
    'Signature Upload',
    'Submit'
  ];
}