import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarusers',
  imports: [MatTableModule,RouterLink,MatIconModule],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent implements OnInit{
  dataSource: MatTableDataSource<Users>= new MatTableDataSource()
  displayedColumns:String[]=['idUser', 'username', 'Estado', 'email','Update','Delete']
  constructor(private uS:UsersService){}

  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.uS.deleteU(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}

