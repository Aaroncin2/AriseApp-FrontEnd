import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Donation } from '../../../models/donations';
import { DonationService } from '../../../services/donation.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-insertardonation',
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
  templateUrl: './insertardonation.component.html',
  styleUrl: './insertardonation.component.css',
})
export class InsertardonationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  donation1: Donation = new Donation();

  constructor(
    private dS: DonationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameDonation: ['', Validators.required],
      donation: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.donation1.nameDonation = this.form.value.nameDonation;
      this.donation1.donation = this.form.value.donation;
      this.dS.insert(this.donation1).subscribe(() => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });
      this.router.navigate(['donations']);
    }
  }
}
