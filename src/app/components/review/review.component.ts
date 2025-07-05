import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarreviewComponent } from './listarreview/listarreview.component';

@Component({
  selector: 'app-review',
  imports: [RouterOutlet, ListarreviewComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  constructor(public route: ActivatedRoute) { }

}
