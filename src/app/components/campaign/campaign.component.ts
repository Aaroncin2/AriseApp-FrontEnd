import { Component } from '@angular/core';
import { ListarcampaignComponent } from './listarcampaign/listarcampaign.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-campaign',
  imports: [ListarcampaignComponent, RouterOutlet],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css'
})
export class CampaignComponent {
  constructor(public route: ActivatedRoute) { 
    
  }

}
