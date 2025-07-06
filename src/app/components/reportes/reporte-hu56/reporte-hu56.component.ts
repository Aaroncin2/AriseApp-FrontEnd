import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HU56DTO } from '../../../models/HU56DTO';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CampaignService } from '../../../services/campaign.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-hu56',
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './reporte-hu56.component.html',
  styleUrl: './reporte-hu56.component.css'
})
export class ReporteHU56Component implements OnInit {
  dataSource: MatTableDataSource<HU56DTO> = new MatTableDataSource<HU56DTO>();
  displayedColumns: string[] = [
    'id_campaign',
    'campaign_name',
    'campaign_description',
    'username',
    'role'
  ];

   
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CampaignService){}
  ngOnInit(): void {
    this.cS.getHU56DTO().subscribe((data: HU56DTO[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

}
