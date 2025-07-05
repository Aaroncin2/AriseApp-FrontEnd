import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../services/campaign.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-insertarcampaign',
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
  templateUrl: './insertarcampaign.component.html',
  styleUrl: './insertarcampaign.component.css'
})
export class InsertarcampaignComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  campaign: Campaign = new Campaign();
  id: number = 0;
  edicion: boolean = false;

  ListaRoles: Role[] = []; //2do

  constructor(
    private cS: CampaignService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private role: RoleService  //1ro
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();

    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nameCampaign: ['', Validators.required],
      descriptionCampaign: ['', Validators.required],
      dateCampaign: ['', Validators.required],
      idRol: ['', Validators.required], //4to
    });

    this.role.list().subscribe((data) => {
      this.ListaRoles = data; //3ro
    });
  }

  aceptar() {
    if (this.form.valid) {
       this.campaign.idCampaign = this.form.value.codigo;
      this.campaign.nameCampaign = this.form.value.nameCampaign;
      this.campaign.descriptionCampaign = this.form.value.descriptionCampaign;
      this.campaign.dateCampaign = this.form.value.dateCampaign;
      this.campaign.role.idRol = this.form.value.idRol; //5to
      


      if (this.edicion) {
        this.cS.update(this.campaign).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.campaign).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
          
        });
      }
       this.router.navigate(['campaign']);
    }
  }
cancelar(){
    this.router.navigate(['campaign']);
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCampaign),
          nameCampaign: new FormControl(data.nameCampaign),
          descriptionCampaign: new FormControl(data.descriptionCampaign),
          dateCampaign: new FormControl(data.dateCampaign),
          idRol: new FormControl(data.role.idRol), //6to
        });
      });
    }
  }

}
