import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { missionRewards } from '../../../models/missionreward';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MissionrewardService } from '../../../services/missionreward.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarmissionreward',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './listarmissionreward.component.html',
  styleUrl: './listarmissionreward.component.css'
})
export class ListarmissionrewardComponent implements OnInit {
  dataSource: MatTableDataSource<missionRewards> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idMissionReward',
    'NameMission',
    'Descripcion',
    'NameReward',
    'update',
    'delete',
  ];
   form: FormGroup

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mR: MissionrewardService,
    private fb: FormBuilder)
   {this.form = fb.group({
      parametro: ['']
    })}

  ngOnInit(): void {
    this.mR.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
    })
    this.mR.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  })

  //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })

}

  eliminar(id: number) {
    this.mR.deleteMR(id).subscribe((data) => {
      this.mR.list().subscribe((data) => {
        this.mR.setList(data);
      });
    });
  }
}
