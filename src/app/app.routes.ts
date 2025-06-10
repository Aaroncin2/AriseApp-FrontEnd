import { Routes } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';
import { InsertardonationComponent } from './components/donation/insertardonation/insertardonation.component';

export const routes: Routes = [
  {
    path: 'donations',
    component: DonationComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertardonationComponent,
      },
    ],
  },
];
