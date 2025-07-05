import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
   FormControl,
   FormGroup, 
   ReactiveFormsModule, 
   Validators
   } from '@angular/forms';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Forum } from '../../../models/forum';
import { ForumService } from '../../../services/forum.service';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-insertarcomment',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatInput,
  ],
  templateUrl: './insertarcomment.component.html',
  styleUrl: './insertarcomment.component.css'
})
export class InsertarcommentComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comment: Comment = new Comment();
  id: number = 0;
  edicion: boolean = false;
  listaForos: Forum[] = [];
  listaUsuarios:Users[] = [];

  constructor(
    private oS: CommentService,
    private f:ForumService,
    private uS: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id']!= null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idComment: [''],
      categoryComment: ['', Validators.required],
      descriptionComment: ['', Validators.required],
      dateComment: ['', Validators.required],
      forum: ['', Validators.required],
      users: ['', Validators.required],
    });
    this.f.list().subscribe((data) => {
      this.listaForos = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.comment.idComment = this.form.value.idComment;
      this.comment.categoryComment = this.form.value.categoryComment;
      this.comment.descriptionComment = this.form.value.descriptionComment;
      this.comment.dateComment = this.form.value.dateComment;
      this.comment.forum.idForum = this.form.value.forum;  
      this.comment.users.idUser = this.form.value.users;

      if (this.edicion) {
        this.oS.update(this.comment).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      } else {
        this.oS.insert(this.comment).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      }
                this.router.navigate(['comments']);
    }
  }
  cancelar(){
    this.router.navigate(['comments']);
  }

  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
          idComment: new FormControl(data.idComment),
          categoryComment: new FormControl (data.categoryComment),
          descriptionComment: new FormControl(data.descriptionComment),
          dateComment: new FormControl (data.dateComment),
          forum: new FormControl(data.forum.idForum),
          users: new FormControl(data.users.idUser),
        });
      });
    }
  }
}

