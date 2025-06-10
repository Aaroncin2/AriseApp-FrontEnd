import { Component, OnInit } from '@angular/core';
import { Forum } from '../../../models/forum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-listarforum',
  imports: [MatTableModule],
  templateUrl: './listarforum.component.html',
  styleUrl: './listarforum.component.css',
})
export class ListarforumComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = ['idForum','contentForum','dateForum','nameForum']
  constructor(private forumService: ForumService) {}
  ngOnInit(): void {
    this.forumService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
