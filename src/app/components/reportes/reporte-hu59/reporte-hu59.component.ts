import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HU59DTO } from '../../../models/HU59DTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { VolunteeringService } from '../../../services/volunteering.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reporte-hu59',
  imports: [MatPaginatorModule, CommonModule, MatTableModule],
  templateUrl: './reporte-hu59.component.html',
  styleUrl: './reporte-hu59.component.css'
})
export class ReporteHU59Component implements OnInit {
 
  dataSource: MatTableDataSource<HU59DTO> = new MatTableDataSource<HU59DTO>();
  displayedColumns: string[] = [
    'id_volunteering',
    'name_volunteering',
    'activity_volunteering',
    'username',
    'attendance_volunteering'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vS: VolunteeringService) {}
  ngOnInit(): void {
    this.vS.getHU59DTO().subscribe((data: HU59DTO[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
