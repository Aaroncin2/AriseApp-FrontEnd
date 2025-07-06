import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaign } from '../models/campaign';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HU56DTO } from '../models/HU56DTO';
const base_url = enviroment.base;


@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private url = `${base_url}/campaigns`;
  private listaCambio = new Subject<Campaign[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Campaign[]>(this.url);
  }
  insert(c: Campaign) {
    return this.http.post(this.url, c)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  setList(listaNueva: Campaign[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Campaign>(`${this.url}/${id}`);
  }
  update(c: Campaign) {
    return this.http.put(this.url, c);
  }
  deleteD(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getHU56DTO(): Observable<HU56DTO[]> {
    return this.http.get<HU56DTO[]>(`${this.url}/HU56`);
  }
}
