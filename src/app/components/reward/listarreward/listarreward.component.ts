import { Component, OnInit } from '@angular/core';
import { Reward } from '../../../models/reward';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RewardService } from '../../../services/reward.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-listarreward',
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarreward.component.html',
  styleUrl: './listarreward.component.css',
})
export class ListarrewardComponent implements OnInit {
  dataSource: MatTableDataSource<Reward> = new MatTableDataSource();
  displayedColumns: string[] = ['idReward', 'nameReward', 'update', 'delete'];
  constructor(private rewardService: RewardService) {}

  ngOnInit(): void {
    this.rewardService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rewardService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rewardService.deleteR(id).subscribe((data) => {
      this.rewardService.list().subscribe((data) => {
        this.rewardService.setList(data);
      });
    });
  }
}
