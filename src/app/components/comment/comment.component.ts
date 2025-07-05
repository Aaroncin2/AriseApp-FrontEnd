import { Component } from '@angular/core';
import { ListarcommentComponent } from './listarcomment/listarcomment.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-comment',
  imports: [ListarcommentComponent, RouterOutlet],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  constructor(public route: ActivatedRoute) { }
}
