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
                '#9CCC65', // Verde Musgo Claro
              '#7CB342', // Verde Mate
              '#558B2F', // Verde Militar
              '#388E3C', // Verde Selva
              '#2E7D32', // Verde Botella
              '#1B5E20', // Verde Petróleo
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
