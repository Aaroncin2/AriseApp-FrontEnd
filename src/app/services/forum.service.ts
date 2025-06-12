import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environments/environment';
import { Forum } from '../models/forum';
import { Subject } from 'rxjs';
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
    return this.listaCambio.asObservable;
  }
  setList(listaNueva: Forum[]) {
    this.listaCambio.next(listaNueva);
  }
}
