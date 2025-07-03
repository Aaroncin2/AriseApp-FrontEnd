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
import { MissionComponent } from './components/mission/mission.component';
import { InsertarmissionComponent } from './components/mission/insertarmission/insertarmission.component';
import { MissionrewardComponent } from './components/missionreward/missionreward.component';
import { InsertarmissionrewardComponent } from './components/missionreward/insertarmissionreward/insertarmissionreward.component';
import { TypedonationsComponent } from './components/typedonations/typedonations.component';
import { InsertartypedonationsComponent } from './components/typedonations/insertartypedonations/insertartypedonations.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteHU54Component } from './components/reportes/reporte-hu54/reporte-hu54.component';
import { ReporteHU55Component } from './components/reportes/reporte-hu55/reporte-hu55.component';
import { ReporteHU58Component } from './components/reportes/reporte-hu58/reporte-hu58.component';
import { ReporteHU56Component } from './components/reportes/reporte-hu56/reporte-hu56.component';
import { ReporteHU57Component } from './components/reportes/reporte-hu57/reporte-hu57.component';

export const routes: Routes = [
  {
    path: 'mission',
    component: MissionComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarmissionComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarmissionComponent,
      },
    ],
  },
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
    children: [
      {
        path: 'nuevo',
        component: InsertarrolesComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarrolesComponent,
      },
    ],
  },
  {
    path: 'missionreward',
    component: MissionrewardComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarmissionrewardComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarmissionrewardComponent,
      },
    ],
  },
  {
    path: 'typedonations',
    component: TypedonationsComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertartypedonationsComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertartypedonationsComponent,
      },
    ],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'hu54',
        component: ReporteHU54Component,
      },
      {
        path: 'hu55',
        component: ReporteHU55Component,
      },
      {
        path: 'hu56',
        component: ReporteHU56Component, 
      },
      {
        path: 'hu57',
        component: ReporteHU57Component, 
      },
      {
        path: 'hu58',
        component: ReporteHU58Component,
      },
    ],
  },
];
