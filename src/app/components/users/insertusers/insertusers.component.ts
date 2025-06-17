import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertusers',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    ],
  templateUrl: './insertusers.component.html',
  styleUrl: './insertusers.component.css'
})
export class InsertusersComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: Users = new Users();
  id: number = 0;
  Estado: boolean = true;
  edicion:boolean=true;

  constructor(
    private uS: UsersService,
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
      codigo: [''],
      username: ['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      enabled: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.user.idUser = this.form.value.codigo;
      this.user.username = this.form.value.username;
      this.user.email= this.form.value.email;
      this.user.password=this.form.value.password;
      this.user.enabled=this.form.value.enabled;

      if (this.edicion) {
        //actualizar
        this.uS.update(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        //insertar
        this.uS.insert(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['users']);
    }
  }
  init() {
    this.uS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        codigo: new FormControl(data.idUser),
        username: new FormControl(data.username),
        password: new FormControl(''),
        email: new FormControl(data.email),
        enabled: new FormControl(data.enabled)
      });
    });
  }
}