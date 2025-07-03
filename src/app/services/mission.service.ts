import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Mission } from '../models/mission';
import { HU58DTO } from '../models/HU58DTO';

const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class MissionService {
private url = `${base_url}/missions`;

  private listaCambio = new Subject<Mission[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Mission[]>(this.url);
  }
  insert(a: Mission) {
    return this.http.post(this.url, a);
  }
  setList(listaNueva: Mission[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Mission>(`${this.url}/${id}`);
  }

  update(a: Mission) {
    return this.http.put(this.url, a);
  }

  deleteM(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getHU58DTO(): Observable<HU58DTO[]> {
      return this.http.get<HU58DTO[]>(`${this.url}/HU58`);
    }
}