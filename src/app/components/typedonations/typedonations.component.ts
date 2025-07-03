import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartypedonationsComponent } from './listartypedonations/listartypedonations.component';

@Component({
  selector: 'app-typedonations',
  imports: [ListartypedonationsComponent,RouterOutlet],
  templateUrl: './typedonations.component.html',
  styleUrl: './typedonations.component.css'
})
export class TypedonationsComponent {
  constructor(public route: ActivatedRoute) {}
}
