import { Component } from '@angular/core';
import { ListarforumComponent } from './listarforum/listarforum.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forum',
  imports: [ListarforumComponent, RouterOutlet],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent {
  constructor(public route: ActivatedRoute) {}
}
