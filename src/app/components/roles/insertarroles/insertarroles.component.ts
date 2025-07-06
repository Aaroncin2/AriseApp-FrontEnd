import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { Role } from '../../../models/role';
import { Users } from '../../../models/users';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertarroles',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './insertarroles.component.html',
  styleUrl: './insertarroles.component.css',
})
export class InsertarrolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  listaUsuarios: Users[] = [];
  id: number = 0;
  edicion: boolean = false;

  roles: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'Administrador' },
    { value: 'VOLUNTARIO', viewValue: 'Voluntario' },
    { value: 'ECOLOGISTA', viewValue: 'Ecologista' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private router: Router,
    private uS: UsersService,
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
      rolcito: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.role.idRol = this.form.value.codigo;
      this.role.rol = this.form.value.rolcito;
      this.role.user.idUser = this.form.value.usuario;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //insertar
        this.rS.insert(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rols']);
    }
  }
  cancelar(){
    this.router.navigate(['rols']);
  }
  init() {
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        codigo: new FormControl(data.idRol),
        rolcito: new FormControl(data.rol),
        usuario: new FormControl(data.user.idUser),
      });
    });
    }
  }
  eliminar(id: number) {
    this.rS.deleteR(id).subscribe(data => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data)
      })
    })
  }
}



