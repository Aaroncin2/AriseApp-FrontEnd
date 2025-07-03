import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { missionRewards } from '../models/missionreward';
import { HU55DTO } from '../models/HU55DTO';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class MissionrewardService {
private url = `${base_url}/missionRewards`;
  private listaCambio = new Subject<missionRewards[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<missionRewards[]>(this.url);
  }
  insert(mr: missionRewards) {
    return this.http.post(this.url, mr);
  }

  setList(listaNueva: missionRewards[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<missionRewards>(`${this.url}/${id}`);
  }
  update(mr: missionRewards) {
    return this.http.put(this.url, mr);
  }
  deleteMR(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getHU55DTO(): Observable<HU55DTO[]> {
      return this.http.get<HU55DTO[]>(`${this.url}/HU55`);
    }
}