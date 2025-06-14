import { Routes } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';
import { InsertardonationComponent } from './components/donation/insertardonation/insertardonation.component';
import { ForumComponent } from './components/forum/forum.component';
import { InsertforumComponent } from './components/forum/insertforum/insertforum.component';
import { RewardComponent } from './components/reward/reward.component';
import { InsertrewardComponent } from './components/reward/insertreward/insertreward.component';

export const routes: Routes = [
  {
    path: 'donations',
    component: DonationComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertardonationComponent,
      },
      {
        path: 'ediciones/:id',component: InsertardonationComponent
      }
    ],
  },
  {
    path:'forums',
    component: ForumComponent,
    children:[
      {
        path:'nuevo',
        component: InsertforumComponent
      },
      {
        path: 'ediciones/:id', component: InsertforumComponent
      }
    ]
  },
  {
    path:'rewards',
    component: RewardComponent,
    children:[
      {
        path:'nuevo',
        component: InsertrewardComponent
      }
    ]
  }
];
