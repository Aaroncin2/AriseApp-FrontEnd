import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarroles',
  imports: [MatButtonModule, CommonModule, MatIconModule, MatTableModule, RouterLink],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css',
})
export class ListarrolesComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['idRol', 'rol', 'user', 'update', 'delete'];
  constructor(private roleService: RoleService) {}
  ngOnInit(): void {
    this.roleService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.roleService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
