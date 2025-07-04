import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TypedonationsService } from '../../../services/typedonations.service';

@Component({
  selector: 'app-reporte-hu54',
  imports: [BaseChartDirective, MatIconModule, CommonModule],
  templateUrl: './reporte-hu54.component.html',
  styleUrl: './reporte-hu54.component.css',
})
export class ReporteHU54Component implements OnInit {
  hasData = false;
  barChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TypedonationsService) {}
  ngOnInit(): void {
    this.tS.getHU54DTO().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.typeDonation);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de Donaciones',
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
        
      }else{
        this.hasData = false;
      }
    });
  }
}
