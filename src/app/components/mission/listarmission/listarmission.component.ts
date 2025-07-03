import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Mission } from '../../../models/mission';
import { MissionService } from '../../../services/mission.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarmission',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,RouterLink
  ],
  templateUrl: './listarmission.component.html',
  styleUrl: './listarmission.component.css'
})
export class ListarmissionComponent implements OnInit{
  dataSource = new MatTableDataSource<Mission>([]);
  displayedColumns: string[] = [
    'idMission',
    'nameMission',
    'descriptionMission', 
    'NameUser',
    'update',
    'delete'
  ];
  form: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mS: MissionService,
    private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
    })
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  })

  //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })

}
  eliminar(id: number) {
    this.mS.deleteM(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
}
