import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmissionComponent } from "./listarmission/listarmission.component";

@Component({
  selector: 'app-mission',
  imports: [RouterOutlet,ListarmissionComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css'
})
export class MissionComponent {
constructor(public route:ActivatedRoute){}
}
