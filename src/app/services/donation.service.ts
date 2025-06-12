import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation } from '../models/donations';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private url = `${base_url}/donations`;
  private listaCambio = new Subject<Donation[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Donation[]>(this.url);
  }
  insert(d: Donation) {
    return this.http.post(this.url, d)
  }
  getList(){
    return this.listaCambio.asObservable
  }
  setList(listaNueva: Donation[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Donation>(`${this.url}/${id}`);
  }
  update(d: Donation) {
    return this.http.put(this.url, d);
  }
}
