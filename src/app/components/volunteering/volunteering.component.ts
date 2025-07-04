import { Component } from '@angular/core';
import { ListarvolunteeringComponent } from './listarvolunteering/listarvolunteering.component';  
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-volunteering',
  imports: [ ListarvolunteeringComponent, RouterOutlet ],
  templateUrl: './volunteering.component.html',
  styleUrl: './volunteering.component.css'
})
export class VolunteeringComponent {
  constructor(public route: ActivatedRoute) {}

}