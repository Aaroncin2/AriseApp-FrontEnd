import { Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HU57DTO } from '../../../models/HU57DTO';
import { ReactiveFormsModule, FormBuilder, Form} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../../services/users.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reporte-hu57',
  imports: [MatFormFieldModule,MatPaginatorModule, CommonModule, ReactiveFormsModule, MatTableModule, MatInputModule],
  templateUrl: './reporte-hu57.component.html',
  styleUrl: './reporte-hu57.component.css'
})
export class ReporteHU57Component  implements OnInit {
dataSource: MatTableDataSource<HU57DTO> = new MatTableDataSource<HU57DTO>();
  displayedColumns: string[] = [
    'id_user',
    'username',
    'email',
    'role'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS:UsersService){
   
  }

  ngOnInit(): void {
    this.uS.getHU57DTO().subscribe((data: HU57DTO[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
}
