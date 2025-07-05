import { Component, OnInit, ViewChild } from '@angular/core';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/comment.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';     

@Component({
  selector: 'app-listarcomments',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
  ],
   templateUrl: './listarcomment.component.html',
   styleUrl: './listarcomment.component.css'

})
export class ListarcommentComponent implements OnInit {
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource<Comment>();
  displayedColumns: string[] = [
    'idComment',
    'categoryComment',
    'descriptionComment',
    'dateComment',
    'update',
    'delete'
  ];

  form: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commentService: CommentService, 
    private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.commentService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;

      })
    this.commentService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  })

    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })

    }

  eliminar(id: number) {
    this.commentService.deleteD(id).subscribe(() => {
      this.commentService.list().subscribe((data) => {
        this.commentService.setList(data);
      });
    });
  }
}

