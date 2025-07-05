import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Volunteering } from '../../../models/volunteering';
import { VolunteeringService } from '../../../services/volunteering.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Campaign } from '../../../models/campaign';
import { Donation } from '../../../models/donations';
import { Role } from '../../../models/role';
import { CampaignService } from '../../../services/campaign.service';
import { DonationService } from '../../../services/donation.service';
import { RoleService } from '../../../services/role.service';


@Component({
  selector: 'app-insertarvolunteering',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './insertarvolunteering.component.html',
  styleUrl: './insertarvolunteering.component.css'




})
export class InsertarvolunteeringComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  volunteering: Volunteering = new Volunteering();
  edicion: boolean = false;
  id: number = 0;
attendanceVolunteering: any;

ListarCampaign: Campaign[] = [];
ListarDonation: Donation[] = [];
ListarRole: Role[] = [];

  constructor(
    private volunteeringService: VolunteeringService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private Campaign: CampaignService,
    private Donation: DonationService,
    private Role: RoleService,
 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.fb.group({
  idVolunteering: [''],
  nameVolunteering: ['', Validators.required],
  activityVolunteering: ['', Validators.required],
  areaVolunteering: ['', Validators.required],
  attendanceVolunteering: [false],
  idCampaign: ['', Validators.required],
  idDonation: ['', Validators.required],  
  idRol: ['', Validators.required]
});

this.Campaign.list().subscribe((data) => {
      this.ListarCampaign = data;
    });

this.Donation.list().subscribe((data) => {
      this.ListarDonation = data;
    });

this.Role.list().subscribe((data) => {
      this.ListarRole = data;
    });


 
 }
  aceptar() {
    if (this.form.valid) {
      this.volunteering.idVolunteering = this.form.value['idVolunteering'];
      this.volunteering.nameVolunteering = this.form.value['nameVolunteering'];
      this.volunteering.activityVolunteering = this.form.value['activityVolunteering'];
      this.volunteering.areaVolunteering = this.form.value['areaVolunteering'];
      this.volunteering.attendanceVolunteering = this.form.value['attendanceVolunteering'];
      this.volunteering.campaign.idCampaign = this.form.value['idCampaign'];
      this.volunteering.donation.idDonation = this.form.value['idDonation'];
      this.volunteering.role.idRol = this.form.value['idRol'];

      if (this.edicion) {
        // Update existing volunteering
        this.volunteeringService.update(this.volunteering).subscribe(() => {
          this.volunteeringService.list().subscribe(data => {
            this.volunteeringService.setList(data);
        });

        });
      } else {
        // Create new volunteering
        this.volunteeringService.insert(this.volunteering).subscribe(() => {
          this.volunteeringService.list().subscribe((data) => {
            this.volunteeringService.setList(data);
          }); 
        });
      }
      this.router.navigate(['volunteering']);
    }
  }
cancelar(){
    this.router.navigate(['volunteering']);
  }
  init() {
    if (this.edicion) {
      this.volunteeringService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
         idVolunteering : new FormControl(data.idVolunteering),
          nameVolunteering: new FormControl(data.nameVolunteering),
          activityVolunteering: new FormControl(data.activityVolunteering),
          areaVolunteering: new FormControl(data.areaVolunteering),
          attendanceVolunteering: new FormControl(data.attendanceVolunteering),
          idCampaign: new FormControl(data.campaign.idCampaign),  
          idDonation: new FormControl(data.donation.idDonation),
          idRol: new FormControl(data.role.idRol)
        });
      });
    }
  }
}


