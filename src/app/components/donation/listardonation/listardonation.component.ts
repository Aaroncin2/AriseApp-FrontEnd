import { Component, OnInit } from '@angular/core';
import { Donation } from '../../../models/donations';
import { DonationService } from '../../../services/donation.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-listardonation',
  imports: [MatTableModule],
  templateUrl: './listardonation.component.html',
  styleUrl: './listardonation.component.css'
})
export class ListardonationComponent {
  dataSource: MatTableDataSource<Donation> = new MatTableDataSource<Donation>()
  displayedColumns: string[] = ['idDonation', 'nameDonation', 'donation'];
  constructor(private donationService: DonationService) { }
  ngOnInit(): void {
    this.donationService.list().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
