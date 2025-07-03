import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Mission } from '../../../models/mission';
import { MissionService } from '../../../services/mission.service';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../models/users';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-insertarmission',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertarmission.component.html',
  styleUrl: './insertarmission.component.css'
})
export class InsertarmissionComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  miss: Mission = new Mission();
  id: number = 0;
  edicion: boolean = false;


  listaUsuarios:Users[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private mS: MissionService,
    private router:Router,
    private uS:UsersService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
        this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar trae data
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.miss.idMission = this.form.value.codigo;
      this.miss.nameMission = this.form.value.nombre;
      this.miss.descriptionMission = this.form.value.descripcion;
      this.miss.users.idUser=this.form.value.usuario
      if (this.edicion) {
        //actualizar
        this.mS.update(this.miss).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        //insertar
        this.mS.insert(this.miss).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['mission']);
    }
  }
  cancelar(){
    this.router.navigate(['mission']);
  }

  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMission),
          nombre: new FormControl(data.nameMission),
          descripcion: new FormControl(data.descriptionMission),
          usuario: new FormControl(data.users.idUser),
        });
      });
    }
  }
}
