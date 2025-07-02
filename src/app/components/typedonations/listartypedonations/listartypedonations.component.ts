import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Typedonations } from '../../../models/typedonations';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TypedonationsService } from '../../../services/typedonations.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listartypedonations',
  imports: [
    MatTableModule,
    CommonModule, 
    RouterLink, 
    MatIconModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './listartypedonations.component.html',
  styleUrl: './listartypedonations.component.css'
})
export class ListartypedonationsComponent implements OnInit{
  dataSource: MatTableDataSource<Typedonations> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idTypeDonation',
    'nameDonation',
    'typeDonation',
    'update',
    'delete'
  ]

  form: FormGroup

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tpS: TypedonationsService,
     private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.tpS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
    })
    this.tpS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  })

  //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })

}
  eliminar(id: number) {
    this.tpS.deleteTP(id).subscribe((data) => {
      this.tpS.list().subscribe((data) => {
        this.tpS.setList(data);
      });
    });
  }
}