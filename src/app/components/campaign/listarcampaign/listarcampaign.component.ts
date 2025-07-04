import { Component, OnInit, ViewChild } from '@angular/core';
import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../services/campaign.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listarcampaign',
  imports: [
    MatTableModule,
    CommonModule, 
    RouterLink, 
    MatIconModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './listarcampaign.component.html',
  styleUrl: './listarcampaign.component.css'
})
export class ListarcampaignComponent implements OnInit {
  dataSource: MatTableDataSource<Campaign> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idCampaign',
    'nameCampaign',
    'descriptionCampaign',
    'dateCampaign',
    'update',
    'delete',
    ];


    form: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private campaignService: CampaignService, 
    private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.campaignService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator
      })
    });
    this.campaignService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase();
    })
  }
  eliminar(id: number) {
    this.campaignService.deleteD(id).subscribe((data) => {
      this.campaignService.list().subscribe((data) => {
        this.campaignService.setList(data);
      });
    });

}
}
