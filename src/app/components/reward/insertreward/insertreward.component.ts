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
import { Reward } from '../../../models/reward';
import { RewardService } from '../../../services/reward.service';
@Component({
  selector: 'app-insertreward',
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
  templateUrl: './insertreward.component.html',
  styleUrl: './insertreward.component.css',
})
export class InsertrewardComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reward: Reward = new Reward();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RewardService,
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
      nameReward: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.reward.idReward = this.form.value.codigo;
      this.reward.nameReward = this.form.value.nameReward;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.reward).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //insertar
        this.rS.insert(this.reward).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rewards']);
    }
  }
  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        codigo: new FormControl(data.idReward),
        nameReward: new FormControl(data.nameReward),
      });
    });
  }
}
