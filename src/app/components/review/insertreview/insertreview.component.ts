import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Review } from '../../../models/review';
import { Users } from '../../../models/users';
import { Mission } from '../../../models/mission';
import { Reward } from '../../../models/reward';
import { Volunteering } from '../../../models/volunteering';
import { Campaign } from '../../../models/campaign';
import { ReviewService } from '../../../services/review.service';
import { UsersService } from '../../../services/users.service';
import { MissionService } from '../../../services/mission.service';
import { RewardService } from '../../../services/reward.service';
import { VolunteeringService } from '../../../services/volunteering.service';
import { CampaignService } from '../../../services/campaign.service';

@Component({
  selector: 'app-insertreview',
  imports: [ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule],
  templateUrl: './insertreview.component.html',
  styleUrl: './insertreview.component.css'
})
export class InsertreviewComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  review: Review = new Review()
  id:number=0
  edicion:boolean=false
  listaUser: Users[]=[]
  listaMission: Mission[]=[]
  listaReward: Reward[]=[]
  listaVolunteering:Volunteering[]=[]
  listaCampaign:Campaign[]=[]

  categoria: { value: string; viewValue: string }[] = [
    { value: 'EVALUACION', viewValue: 'Evaluación' },
    { value: 'FEEDBACK', viewValue: 'FeedBack' },
    { value: 'CRITICA', viewValue: 'Crítica' },
    { value: 'COMENTARIO', viewValue: 'Comentario' },
  ];

  constructor(
    private rS:ReviewService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private us:UsersService,
    private mis:MissionService,
    private re:RewardService,
    private vo:VolunteeringService,
    private ca:CampaignService,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
    this.form= this.formBuilder.group({
      codigo: [''],
      categoryReview: ['', Validators.required],
      qualificationReview: ['', Validators.required],
      textReview: ['', Validators.required],
      users: ['', Validators.required],
      missions: ['', Validators.required],
      rewards: ['', Validators.required],
      volunteerings: ['', Validators.required],
      campaigns: ['', Validators.required],
    })
    this.us.list().subscribe((data) => {
      this.listaUser = data;
    })
    this.mis.list().subscribe((data) => {
      this.listaMission = data;
    })
    this.re.list().subscribe((data) => {
      this.listaReward = data;
    })
    this.vo.list().subscribe((data) => {
      this.listaVolunteering = data;
    })
    this.ca.list().subscribe((data) => {
      this.listaCampaign = data;
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.review.idReview = this.form.value.codigo;
      this.review.categoryReview = this.form.value.categoryReview;
      this.review.qualificationReview = this.form.value.qualificationReview;
      this.review.textReview = this.form.value.textReview;
      this.review.users.idUser = this.form.value.users;
      this.review.mission.idMission = this.form.value.missions;
      this.review.reward.idReward = this.form.value.rewards;
      this.review.volunteering.idVolunteering = this.form.value.volunteerings;
      this.review.campaign.idCampaign = this.form.value.campaigns;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.review).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          })
        })
      } else {
        // Insertar
        this.rS.insert(this.review).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          })
        })
      }
      this.router.navigate(['reviews']);
    }
  }
  cancelar(){
    this.router.navigate(['reviews']);
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idReview),
          categoryReview: new FormControl(data.categoryReview),
          qualificationReview: new FormControl(data.qualificationReview),
          textReview: new FormControl(data.textReview),
          users: new FormControl(data.users.idUser),
          missions: new FormControl(data.mission.idMission),
          rewards: new FormControl(data.reward.idReward),
          volunteerings: new FormControl(data.volunteering.idVolunteering),
          campaigns: new FormControl(data.campaign.idCampaign),
        })
      })
    }
  }
}
