import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environments/environment';
import { Forum } from '../models/forum';
import { Observable, Subject } from 'rxjs';
import { HU60DTO } from '../models/HU60DTO';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private url = `${base_url}/forums`;
  private listaCambio = new Subject<Forum[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Forum[]>(this.url);
  }
  insert(f: Forum) {
    return this.http.post(this.url, f);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Forum[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Forum>(`${this.url}/${id}`);
  }
  update(f: Forum) {
    return this.http.put(this.url, f);
  }
  deleteF(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getHU60DTO(): Observable<HU60DTO[]> {
    return this.http.get<HU60DTO[]>(`${this.url}/HU60`);
  }
}
