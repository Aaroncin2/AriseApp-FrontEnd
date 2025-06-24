import { Component, OnInit, ViewChild } from '@angular/core';
import { Donation } from '../../../models/donations';
import { DonationService } from '../../../services/donation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-listardonation',
  imports: [
    MatTableModule,
    CommonModule, 
    RouterLink, 
    MatIconModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
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

  form: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private donationService: DonationService, private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.donationService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
    })
    });
    this.donationService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })
    
  }
  eliminar(id: number) {
    this.donationService.deleteD(id).subscribe((data) => {
      this.donationService.list().subscribe((data) => {
        this.donationService.setList(data);
      });
    });
  }
}
