import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable, Subject } from 'rxjs';
import { HU57DTO } from '../models/HU57DTO';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url=`${base_url}/users`
  private listaCambio = new Subject<Users[]>();
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Users[]>(this.url)
  }
  insert(u: Users) {
        return this.http.post(this.url, u);
      }
      getList() {
        return this.listaCambio.asObservable();
      }
      setList(listaNueva: Users[]) {
        this.listaCambio.next(listaNueva);
      }
      listId(id: number) {
        return this.http.get<Users>(`${this.url}/${id}`);
      }
      update(u: Users) {
        return this.http.put(this.url, u);
      }
      deleteU(id: number) {
        return this.http.delete(`${this.url}/${id}`);
      }
      getHU57DTO():Observable<HU57DTO[]> {
        return this.http.get<HU57DTO[]>(`${this.url}/HU57`);
      }
}