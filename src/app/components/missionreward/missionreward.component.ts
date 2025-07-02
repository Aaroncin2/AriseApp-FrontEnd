import { Component } from '@angular/core';
import { ListarmissionrewardComponent } from "./listarmissionreward/listarmissionreward.component";
import { ActivatedRoute,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-missionreward',
  imports: [ListarmissionrewardComponent,RouterOutlet],
  templateUrl: './missionreward.component.html',
  styleUrl: './missionreward.component.css'
})
export class MissionrewardComponent {
  constructor(public route: ActivatedRoute) { }
}
