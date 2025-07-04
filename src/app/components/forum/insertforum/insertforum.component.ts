import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Forum } from '../../../models/forum';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-insertforum',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertforum.component.html',
  styleUrl: './insertforum.component.css',
})
export class InsertforumComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  forum: Forum = new Forum();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private fS: ForumService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo:[''],
      nameForum: ['', Validators.required],
      contentForum: ['', Validators.required],
      dateForum: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.forum.idForum = this.form.value.codigo;
      this.forum.nameForum = this.form.value.nameForum;
      this.forum.contentForum = this.form.value.contentForum;
      this.forum.dateForum = this.form.value.dateForum;

      console.log(this.forum);

      
      if (this.edicion) {
        //actualizar
        this.fS.update(this.forum).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        // Insertar
        this.fS.insert(this.forum).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['forums']);
    }
  }
  cancelar(){
    this.router.navigate(['forums']);
  }
  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idForum),
          nameForum: new FormControl(data.nameForum),
          contentForum: new FormControl(data.contentForum),
          dateForum: new FormControl(data.dateForum),
        });
      });
    }
  }
}

