import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';
import { RewardComponent } from './components/reward/reward.component';
import { ForumComponent } from './components/forum/forum.component';
import { UsersComponent } from './components/users/users.component';

@Component({
  selector: 'app-root',
  imports: [RewardComponent, DonationComponent, ForumComponent,UsersComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AriseApp-FrontEnd';
}
