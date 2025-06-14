import { Component, OnInit } from '@angular/core';
import { Forum } from '../../../models/forum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ForumService } from '../../../services/forum.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarforum',
  imports: [MatTableModule, RouterLink, MatIconModule],
  templateUrl: './listarforum.component.html',
  styleUrl: './listarforum.component.css',
})
export class ListarforumComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idForum',
    'contentForum',
    'dateForum',
    'nameForum',
    'update',
    'delete',
  ];
  constructor(private forumService: ForumService) {}
  ngOnInit(): void {
    this.forumService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.forumService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.forumService.deleteF(id).subscribe((data) => {
      this.forumService.list().subscribe((data) => {
        this.forumService.setList(data);
      });
    });
  }
}
