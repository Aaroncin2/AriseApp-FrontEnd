import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarroles',
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css',
})
export class ListarrolesComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['idRol', 'rol', 'user', 'update', 'delete'];
  form: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roleService: RoleService,
    private fb: FormBuilder) {this.form = fb.group({
      parametro: ['']})}
  ngOnInit(): void {
    this.roleService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
      this.roleService.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
    //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe((value) => {
      this.dataSource.filter = value.trim().toLowerCase();
    });
  }
  eliminar(id: number) {
    this.roleService.deleteR(id).subscribe((data) => {
      this.roleService.list().subscribe((data) => {
        this.roleService.setList(data);
      });
    });
  }
}
