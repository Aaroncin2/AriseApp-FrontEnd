import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HU63DTO } from '../../../models/HU63DTO';
import { MatPaginator } from '@angular/material/paginator';
import { ForumService } from '../../../services/forum.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte-hu63',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatIconModule],
  templateUrl: './reporte-hu63.component.html',
  styleUrl: './reporte-hu63.component.css'
})
export class ReporteHU63Component implements OnInit {
  dataSource: MatTableDataSource<HU63DTO> = new MatTableDataSource<HU63DTO>();
  displayedColumns: string[] = [
    'username',
    'name_forum'
  ];

  @ViewChild(MatTable) paginator!: MatPaginator;

  constructor(private fS: ForumService) {}

  ngOnInit(): void {
    this.fS.getHU63DTO().subscribe((data: HU63DTO[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
