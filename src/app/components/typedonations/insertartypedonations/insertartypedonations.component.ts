import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Typedonations } from '../../../models/typedonations';
import { TypedonationsService } from '../../../services/typedonations.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../services/users.service';
import { DonationService } from '../../../services/donation.service';
import { Donation } from '../../../models/donations';

@Component({
  selector: 'app-insertartypedonations',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertartypedonations.component.html',
  styleUrl: './insertartypedonations.component.css'
})
export class InsertartypedonationsComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  typedonations: Typedonations = new Typedonations();
  listaDonations: Donation[] = [];
  id: number = 0;
  edicion: boolean = false;
tipos: { value: string; viewValue: string }[] = [
    { value: 'Monetario', viewValue: 'Monetario' },
    { value: 'Viveres', viewValue: 'Viveres' },
    { value: 'Material', viewValue: 'Material' },
    { value: 'Tiempo o Servicio', viewValue: 'Tiempo o servicio' },
]
  constructor(
    private tpS: TypedonationsService,
    private dS: DonationService,
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
      IdDonation: ['', Validators.required],
      typeDonation: ['', Validators.required],
    });
    this.dS.list().subscribe((data) => {
      this.listaDonations = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.typedonations.idTypeDonation = this.form.value.codigo;
      this.typedonations.typeDonation = this.form.value.typeDonation;
      this.typedonations.donation.idDonation = this.form.value.IdDonation;
      if (this.edicion) {
        //actualizar
        this.tpS.insert(this.typedonations).subscribe(() => {
          this.tpS.list().subscribe((data) => {
            this.tpS.setList(data);
          });
        });
      } else {
        // Insertar
        this.tpS.insert(this.typedonations).subscribe(() => {
          this.tpS.list().subscribe((data) => {
            this.tpS.setList(data);
          });
        });
      }
      this.router.navigate(['typedonations']);
    }
  }
  cancelar(){
    this.router.navigate(['typedonations']);
  }
  init() {
    if (this.edicion) {
      this.tpS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTypeDonation),
          typeDonation: new FormControl(data.typeDonation),
          IdDonation: new FormControl(data.donation.idDonation),
        });
      });
    }
  }
}
