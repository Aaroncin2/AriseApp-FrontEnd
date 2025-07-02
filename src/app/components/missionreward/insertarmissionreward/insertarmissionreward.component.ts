import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { missionRewards } from '../../../models/missionreward';
import { MissionrewardService } from '../../../services/missionreward.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-insertarmissionreward',
  imports: [ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './insertarmissionreward.component.html',
  styleUrl: './insertarmissionreward.component.css'
})
export class InsertarmissionrewardComponent  implements OnInit {
  form: FormGroup = new FormGroup({});
  missionrewards: missionRewards = new missionRewards();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private mrS: MissionrewardService,
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
      description: ['', Validators.required],
      mission: ['', Validators.required],
      reward: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.missionrewards.idMission = this.form.value.codigo;
      this.missionrewards.descripcion = this.form.value.description;
      this.missionrewards.mission.idMission = this.form.value.mission;
      this.missionrewards.reward.idReward = this.form.value.reward;
      if (this.edicion) {
        //actualizar
        this.mrS.insert(this.missionrewards).subscribe(() => {
          this.mrS.list().subscribe((data) => {
            this.mrS.setList(data);
          });
        });
      } else {
        // Insertar
        this.mrS.insert(this.missionrewards).subscribe(() => {
          this.mrS.list().subscribe((data) => {
            this.mrS.setList(data);
          });
        });
      }
      this.router.navigate(['missionreward']);
    }
  }
  cancelar(){
    this.router.navigate(['missionreward']);
  }
  init() {
    if (this.edicion) {
      this.mrS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMission),
          description: new FormControl(data.descripcion),
          mission: new FormControl(data.mission.idMission),
          reward: new FormControl(data.reward.idReward),
        });
      });
    }
  }
}