import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HU61DTO } from '../../../models/HU61DTO';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-reporte-hu61',
  imports: [MatFormFieldModule,
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule],
  templateUrl: './reporte-hu61.component.html',
  styleUrl: './reporte-hu61.component.css'
})
export class ReporteHu61Component implements OnInit {
dataSource: MatTableDataSource<HU61DTO> = new MatTableDataSource<HU61DTO>();
  displayedColumns: string[] = [
    'username',
    'category_comment',
    'description'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS:CommentService){
   
  }

  ngOnInit(): void {
    this.cS.getHU61DTO().subscribe((data: HU61DTO[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
