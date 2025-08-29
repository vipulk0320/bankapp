import { Routes } from '@angular/router';
import { ViewBankDetails } from './components/view-bank-details/view-bank-details';
import { CountrySelectorComponent } from './components/country-selector/country-selector';
import { CustomerInfoComponent } from './components/customer-info/customer-info';
import { DocumentUploadComponent } from './components/document-upload/document-upload';
import { IdVerificationComponent } from './components/id-verification/id-verification';
import { PoliticalCheckComponent } from './components/political-check/political-check';
import { ProductSelectionComponent } from './components/product-selection/product-selection';
import { SignatureUploadComponent } from './components/signature-upload/signature-upload';
import { SubmitComponent } from './components/submit/submit';
import { SummaryPdfComponent } from './components/summary-pdf/summary-pdf';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [

  {
    path: 'view-bank-details',
    component: ViewBankDetails
  },
  { path: 'login', component: LoginComponent },
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

