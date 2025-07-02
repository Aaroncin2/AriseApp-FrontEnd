import { Component, OnInit, ViewChild } from '@angular/core';
import { Forum } from '../../../models/forum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ForumService } from '../../../services/forum.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarforum',
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

  templateUrl: './listarforum.component.html',
  styleUrl: './listarforum.component.css',
})
export class ListarforumComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idForum',
    'contentForum',
    'dateForum',
    'nameForum',
    'update',
    'delete'
  ]

  form: FormGroup

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private forumService: ForumService, private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.forumService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
    })
    this.forumService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  })

  //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })

}
  eliminar(id: number) {
    this.forumService.deleteF(id).subscribe((data) => {
      this.forumService.list().subscribe((data) => {
        this.forumService.setList(data);
      });
    });
  }
}

