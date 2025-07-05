import { Component, OnInit, ViewChild } from '@angular/core';
import { Volunteering } from '../../../models/volunteering';
import { VolunteeringService } from '../../../services/volunteering.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarvolunteering',
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
  templateUrl: './listarvolunteering.component.html',
  styleUrl: './listarvolunteering.component.css'
})
export class ListarvolunteeringComponent implements OnInit {
  dataSource: MatTableDataSource<Volunteering> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idVolunteering',
     'nameVolunteering',
      'areaVolunteering', 
      'activityVolunteering',
      'attendanceVolunteering',
       'update',
        'delete'
      ]

      form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private volunteeringService: VolunteeringService, private fb: FormBuilder) {
  this.form = fb.group({
    parametro: [''] 
  })
}




  ngOnInit(): void {
    this.volunteeringService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);


      setTimeout(() => {
      this.dataSource.paginator = this.paginator;

    })
    this.volunteeringService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  })

    this.form.get('parametro')?.valueChanges.subscribe(value => { 
    this.dataSource.filter = value.trim().toLowerCase();
  })


}


  eliminar(id: number) {
    this.volunteeringService.deleteD(id).subscribe(() => {
      this.volunteeringService.list().subscribe(data => {
        this.volunteeringService.setList(data);
      });
    });
  }
  }