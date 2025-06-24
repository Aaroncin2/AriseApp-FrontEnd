import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from '../../../models/users';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarusers',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent implements OnInit{
  dataSource: MatTableDataSource<Users>= new MatTableDataSource()
  displayedColumns: string[]=['idUser', 'username', 'Estado', 'email','Update','Delete']
  
  form: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private uS:UsersService, private fb: FormBuilder){
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
      })

    })
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })
    
  }
  eliminar(id: number) {
    this.uS.deleteU(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}

