import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HU60DTO } from '../../../models/HU60DTO';
import { ForumService } from '../../../services/forum.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reporte-hu60',
  imports: [MatTableModule, MatFormFieldModule,MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './reporte-hu60.component.html',
  styleUrl: './reporte-hu60.component.css'
})
export class ReporteHU60Component implements OnInit{
  dataSource: MatTableDataSource<HU60DTO> = new MatTableDataSource<HU60DTO>();
  displayedColumns: string[] = [
    'username',
    'content_forum',
    'description_forum'
  ]
  @ViewChild(MatTable) paginator!: MatPaginator;

  constructor(private fS:ForumService) {}
  ngOnInit(): void {
    this.fS.getHU60DTO().subscribe((data: HU60DTO[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
