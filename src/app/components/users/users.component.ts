import { Component } from '@angular/core';
import { ListarusersComponent } from './listarusers/listarusers.component';
import { ActivatedRoute,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [ListarusersComponent,RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(public route:ActivatedRoute) {}
}
