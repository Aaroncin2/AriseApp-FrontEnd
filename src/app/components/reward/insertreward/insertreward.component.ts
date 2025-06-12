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

  constructor(
    private rS: RewardService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameReward: ['', Validators.required],
    });
  }
  aceptar(){
    if (this.form.valid) {
      this.reward.nameReward = this.form.value.nameReward;
      this.rS.insert(this.reward).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['rewards']);
    }
  }
}
