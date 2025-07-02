import { Component, OnInit, ViewChild } from '@angular/core';
import { Reward } from '../../../models/reward';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RewardService } from '../../../services/reward.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-listarreward',
  imports: [MatTableModule,
    CommonModule, 
    RouterLink, 
    MatIconModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule],
  templateUrl: './listarreward.component.html',
  styleUrl: './listarreward.component.css',
})
export class ListarrewardComponent implements OnInit {
  dataSource: MatTableDataSource<Reward> = new MatTableDataSource();
  displayedColumns: string[] = ['idReward', 'nameReward', 'update', 'delete'];

  form: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rewardService: RewardService, private fb: FormBuilder) {
    this.form = fb.group({
      parametro: ['']
    })
  }

  ngOnInit(): void {
    this.rewardService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // CONFIGURAR el paginador después de cargar los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
    })
    });
    this.rewardService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    
    //Buscar por filtro
    this.form.get('parametro')?.valueChanges.subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase()
    })

  }
  eliminar(id: number) {
    this.rewardService.deleteR(id).subscribe((data) => {
      this.rewardService.list().subscribe((data) => {
        this.rewardService.setList(data);
      });
    });
  }
}
