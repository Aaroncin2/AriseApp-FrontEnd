import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-listarreview',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './listarreview.component.html',
  styleUrl: './listarreview.component.css',
})
export class ListarreviewComponent implements OnInit {
  dataSource: MatTableDataSource<Review> = new MatTableDataSource<Review>();
  displayedColumns: string[] = [
    'idReview',
    'categoryReview',
    'qualificationReview',
    'textReview',
    'users',
    'mission',
    'reward',
    'volunteering',
    'campaign',
    'update',
    'delete',
  ];
  form: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: ReviewService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = fb.group({
      parametro: [''],
    });
  }
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: Review, filter: string) =>
        data.textReview.toLowerCase().includes(filter) ||
        data.categoryReview.toLowerCase().includes(filter);

      this.form.get('parametro')?.valueChanges.subscribe((value) => {
        this.dataSource.filter = value.trim().toLowerCase();
      });
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  paginatedData(): Review[] {
    if (!this.dataSource?.data || !this.paginator) return [];
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return this.dataSource.filteredData.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  eliminar(id: number): void {
    this.rS.deleteR(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
