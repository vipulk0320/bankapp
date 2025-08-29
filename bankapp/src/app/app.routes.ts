import { Routes } from '@angular/router';
import { CountrySelectorComponent } from './components/country-selector/country-selector';
import { IdVerificationComponent } from './components/id-verification/id-verification';
import { CustomerInfoComponent } from './components/customer-info/customer-info';
import { ProductSelectionComponent } from './components/product-selection/product-selection';
import { PoliticalCheckComponent } from './components/political-check/political-check';
import { DocumentUploadComponent } from './components/document-upload/document-upload';
import { SignatureUploadComponent } from './components/signature-upload/signature-upload';
import { SummaryPdfComponent } from './components/summary-pdf/summary-pdf';
import { SubmitComponent } from './components/submit/submit';

// Add more components as you build them
// import { CustomerInfoComponent } from './customer-info/customer-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-country',
    pathMatch: 'full'
  },
  {
    path: 'select-country',
    component: CountrySelectorComponent
  },
  {
    path: 'id-verification',
    component: IdVerificationComponent
  },
  {
    path: 'customer-info',
    component: CustomerInfoComponent
  },
  {
    path: 'product-selection',
    component: ProductSelectionComponent
  },
  {
    path: 'political-check',
    component: PoliticalCheckComponent
  },
  {
    path: 'document-upload',
    component: DocumentUploadComponent
  },
  {
    path: 'signature-upload',
    component: SignatureUploadComponent
  },
  {
    path: 'summary-pdf',
    component: SummaryPdfComponent
  },
  {
    path: 'submit',
    component: SubmitComponent
  }
];
