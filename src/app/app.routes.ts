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
];
