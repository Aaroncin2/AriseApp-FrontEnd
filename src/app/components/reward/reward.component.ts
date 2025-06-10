import { Component } from '@angular/core';
import { ListarrewardComponent } from './listarreward/listarreward.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reward',
  imports: [ListarrewardComponent, RouterOutlet],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.css'
})
export class RewardComponent {
constructor(public route: ActivatedRoute) { }
}
