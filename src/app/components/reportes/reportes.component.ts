import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReporteHU54Component } from './reporte-hu54/reporte-hu54.component';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet, ReporteHU54Component],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute){}
}
