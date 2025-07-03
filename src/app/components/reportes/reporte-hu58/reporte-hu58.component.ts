import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MissionService } from '../../../services/mission.service';

@Component({
  selector: 'app-reporte-hu58',
  imports: [BaseChartDirective, MatIconModule, CommonModule],
  templateUrl: './reporte-hu58.component.html',
  styleUrl: './reporte-hu58.component.css',
})
export class ReporteHU58Component implements OnInit {
  hasData = false;
  barChartOptions = {
    responsive: true,
  };
   barChartLabels: string[] = [];
    barChartType: ChartType = 'doughnut';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    constructor(private mS: MissionService) {}
    ngOnInit(): void {
      this.mS.getHU58DTO().subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = ['Total de Misiones'];
          this.barChartData = [
            {
              data: [data[0].total_missions],
              label: 'Cantidad de Misiones',
              backgroundColor: [
                '#FF0000', // Rojo intenso
                '#FF4500', // Rojo estándar
                '#FF6347', // Rojo oscuro
                '#FF7F50', // Rojo claro
                '#FF8C00', // Rojo suave
                '#FFA07A', // Rojo medio
              ],
              borderColor: 'rgba(173, 216, 230, 1)',
              borderWidth: 1,
            },
          ];
        } else {
          this.hasData = false;
        }
      });
    }
}
