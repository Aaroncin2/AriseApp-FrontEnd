import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fS: ForumService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameForum: ['', Validators.required],
      contentForum: ['', Validators.required],
      dateForum: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.forum.nameForum = this.form.value.nameForum;
      this.forum.contentForum = this.form.value.contentForum;
      this.forum.dateForum = this.form.value.dateForum;
      this.fS.insert(this.forum).subscribe(() => {
        this.fS.list().subscribe((data) => {
          this.fS.setList(data);
        });
      });
      this.router.navigate(['forums']);
    }
  }
}
