import { Component, OnInit } from '@angular/core';
import { Reward } from '../../../models/reward';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RewardService } from '../../../services/reward.service';
@Component({
  selector: 'app-listarreward',
  imports: [MatTableModule],
  templateUrl: './listarreward.component.html',
  styleUrl: './listarreward.component.css',
})
export class ListarrewardComponent implements OnInit {
  dataSource: MatTableDataSource<Reward> = new MatTableDataSource();
  displayedColumns: string[] = ['idReward', 'nameReward'];
  constructor(private rewardService: RewardService) {}

  ngOnInit(): void {
    this.rewardService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
