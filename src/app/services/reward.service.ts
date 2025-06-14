import { Injectable } from '@angular/core';
import { Reward } from '../models/reward';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private url = `${base_url}/rewards`;
    private listaCambio = new Subject<Reward[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Reward[]>(this.url);
  }
  insert(r: Reward) {
      return this.http.post(this.url, r);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Reward[]) {
      this.listaCambio.next(listaNueva);
    }
    listId(id: number) {
      return this.http.get<Reward>(`${this.url}/${id}`);
    }
    update(r: Reward) {
      return this.http.put(this.url, r);
    }
    deleteR(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
