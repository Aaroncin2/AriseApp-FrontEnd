import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
const base_url = enviroment.base;

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url=`${base_url}/rols`;
  private listaCambio = new Subject<Role[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Role[]>(this.url);
  }
  insert(role: Role) {
    return this.http.post(this.url, role);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
  update(role: Role) {
    return this.http.put(this.url, role);
  }
  deleteR(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
