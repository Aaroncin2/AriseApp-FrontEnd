import { Routes } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';
import { InsertardonationComponent } from './components/donation/insertardonation/insertardonation.component';
import { ForumComponent } from './components/forum/forum.component';
import { InsertforumComponent } from './components/forum/insertforum/insertforum.component';
import { RewardComponent } from './components/reward/reward.component';
import { InsertrewardComponent } from './components/reward/insertreward/insertreward.component';
import { UsersComponent } from './components/users/users.component';
import { InsertusersComponent } from './components/users/insertusers/insertusers.component';
import { RolesComponent } from './components/roles/roles.component';
import { InsertarrolesComponent } from './components/roles/insertarroles/insertarroles.component';

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
        path: 'ediciones/:id',
        component: InsertardonationComponent,
      },
    ],
  },
  {
    path: 'forums',
    component: ForumComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertforumComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertforumComponent,
      },
    ],
  },
  {
    path: 'rewards',
    component: RewardComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertrewardComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertrewardComponent,
      },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertusersComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertusersComponent,
      },
    ],
  },
  {
    path: 'rols',
    component: RolesComponent,
    children:[
      {
        path: 'nuevo',
        component: InsertarrolesComponent,
      },
      {
        path:'ediciones/:id', 
        component:InsertarrolesComponent
      }
    ]
  },
];
