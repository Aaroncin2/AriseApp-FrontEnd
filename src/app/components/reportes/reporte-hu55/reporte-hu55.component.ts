import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MissionComponent } from '../../mission/mission.component';
import { MissionrewardService } from '../../../services/missionreward.service';

@Component({
  selector: 'app-reporte-hu55',
  imports: [BaseChartDirective, MatIconModule, CommonModule],
  templateUrl: './reporte-hu55.component.html',
  styleUrl: './reporte-hu55.component.css',
})
export class ReporteHU55Component implements OnInit {
  hasData = false;
  barChartOptions = {
    responsive: true,
  };
  barChartLabels: number[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private mS: MissionrewardService) {}
  ngOnInit(): void {
    this.mS.getHU55DTO().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.total_rewards);
        this.barChartData = [
          {
            data: data.map((item) => item.id_missions),
            label: 'Cantidad de Recompensas',
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
