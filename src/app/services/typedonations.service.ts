import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Typedonations } from '../models/typedonations';
import { HttpClient } from '@angular/common/http';
import { HU54DTO } from '../models/HU54DTO';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class TypedonationsService {
  private url = `${base_url}/typeDonations`;
  private listaCambio = new Subject<Typedonations[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Typedonations[]>(this.url);
  }
  insert(tp :Typedonations) {
    return this.http.post(this.url, tp);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Typedonations[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Typedonations>(`${this.url}/${id}`);
  }
  update(tp: Typedonations) {
    return this.http.put(this.url, tp);
  }
  deleteTP(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getHU54DTO(): Observable<HU54DTO[]> {
    return this.http.get<HU54DTO[]>(`${this.url}/HU54`);
  }
}