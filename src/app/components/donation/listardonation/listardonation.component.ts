import { Component, OnInit } from '@angular/core';
import { Donation } from '../../../models/donations';
import { DonationService } from '../../../services/donation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listardonation',
  imports: [MatTableModule, RouterLink, MatIconModule],
  templateUrl: './listardonation.component.html',
  styleUrl: './listardonation.component.css',
})
export class ListardonationComponent implements OnInit {
  dataSource: MatTableDataSource<Donation> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idDonation',
    'nameDonation',
    'donation',
    'update',
    'delete',
  ];
  constructor(private donationService: DonationService) {}
  ngOnInit(): void {
    this.donationService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.donationService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.donationService.deleteD(id).subscribe((data) => {
      this.donationService.list().subscribe((data) => {
        this.donationService.setList(data);
      });
    });
  }
}
