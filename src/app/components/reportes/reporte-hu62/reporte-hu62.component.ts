import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { CommentService } from '../../../services/comment.service';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-hu62',
  imports: [BaseChartDirective,MatIconModule,CommonModule],
  templateUrl: './reporte-hu62.component.html',
  styleUrl: './reporte-hu62.component.css'
})
export class ReporteHu62Component implements OnInit {
hasData =false;
barChartOptions={
  responsive: true,
};
barChartLabels: string[] = [];
  barChartType: ChartType ='bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: CommentService) {}
  ngOnInit(): void {
    this.cS.getHU62DTO().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.username);
        this.barChartData = [
          {
            data: data.map((item) => item.totalComments),
            label: 'Cantidad de Comentarios',
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

