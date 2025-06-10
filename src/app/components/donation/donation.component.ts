import { Component } from '@angular/core';
import { ListardonationComponent } from './listardonation/listardonation.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-donation',
  imports: [ListardonationComponent, RouterOutlet],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
constructor(public route: ActivatedRoute) { }
}
