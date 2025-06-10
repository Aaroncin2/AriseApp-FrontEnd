import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';


@Component({
  selector: 'app-root',
  imports: [DonationComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AriseApp-FrontEnd';
}
