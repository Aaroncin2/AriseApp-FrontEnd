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

import { CampaignComponent } from './components/campaign/campaign.component';
import { InsertarcampaignComponent } from './components/campaign/insertarcampaign/insertarcampaign.component';
import { CommentComponent } from './components/comment/comment.component';
import { InsertarcommentComponent } from './components/comment/insertarcomment/insertarcomment.component';
import { VolunteeringComponent } from './components/volunteering/volunteering.component';
import { InsertarvolunteeringComponent } from './components/volunteering/insertarvolunteering/insertarvolunteering.component';

import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteHU54Component } from './components/reportes/reporte-hu54/reporte-hu54.component';
import { ReporteHU55Component } from './components/reportes/reporte-hu55/reporte-hu55.component';
import { ReporteHU58Component } from './components/reportes/reporte-hu58/reporte-hu58.component';
import { ReporteHU56Component } from './components/reportes/reporte-hu56/reporte-hu56.component';
import { ReporteHU57Component } from './components/reportes/reporte-hu57/reporte-hu57.component';
import { ReporteHU60Component } from './components/reportes/reporte-hu60/reporte-hu60.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { guardGuard } from './guard/guard.guard';


export const routes: Routes = [
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'chatbot',
    component: ChatbotComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'mission',  //delete ecologista y admin
    component: MissionComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']},
    children: [
      {
        path: 'nuevo',
        component: InsertarmissionComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
      {
        path: 'ediciones/:id',
        component: InsertarmissionComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
    ],
  },
  {
    path: 'donations',
    component: DonationComponent,
     canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']},
    children: [
      {
        path: 'nuevo',
        component: InsertardonationComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']}

      },
      {
        path: 'ediciones/:id',
        component: InsertardonationComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']}
      },
    ],
  },
  {
    path: 'forums',
    component: ForumComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']},
    children: [
      {
        path: 'nuevo',
        component: InsertforumComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']}
      },
      {
        path: 'ediciones/:id',
        component: InsertforumComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']}
      },
    ],
  },
  {
    path: 'rewards', //delete ecologista y admin
    component: RewardComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA','VOLUNTARIO']},
    children: [
      {
        path: 'nuevo',
        component: InsertrewardComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
      {
        path: 'ediciones/:id',
        component: InsertrewardComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']},
    children: [
      {
        path: 'nuevo',
        component: InsertusersComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
      {
        path: 'ediciones/:id',
        component: InsertusersComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
    ],
  },
  {
    path: 'rols',
    component: RolesComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN']},
    children: [
      {
        path: 'nuevo',
        component: InsertarrolesComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN']}
      },
      {
        path: 'ediciones/:id',
        component: InsertarrolesComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN']}
      },
    ],
  },
  {
    path: 'missionreward',
    component: MissionrewardComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']},
    children: [
      {
        path: 'nuevo',
        component: InsertarmissionrewardComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
      {
        path: 'ediciones/:id',
        component: InsertarmissionrewardComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
    ],
  },
  {
    path: 'typedonations',
    component: TypedonationsComponent,
    canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']},
    children: [
      {
        path: 'nuevo',
        component: InsertartypedonationsComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
      {
        path: 'ediciones/:id',
        component: InsertartypedonationsComponent,
        canActivate: [guardGuard],data: { rol: ['ADMIN','ECOLOGISTA']}
      },
    ],
  },
  {
    path: 'campaign',
    component: CampaignComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarcampaignComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarcampaignComponent,
      },
    ],
  },
  {
    path: 'comments',
    component: CommentComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarcommentComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarcommentComponent,
      },
    ],
  },
  {
    path: 'volunteering',
    component: VolunteeringComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarvolunteeringComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarvolunteeringComponent,
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
        path: 'hu58',
        component: ReporteHU58Component,
      },
      {
        path: 'hu57',
        component: ReporteHU57Component,
      },
      {
        path: 'hu60',
        component: ReporteHU60Component,
      },
    ],
  },
];
