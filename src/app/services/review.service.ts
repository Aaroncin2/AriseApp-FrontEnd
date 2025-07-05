import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Review } from '../models/review';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
private url = `${base_url}/reviews`;
private listaCambio = new Subject<Review[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Review[]>(this.url);
  }
  insert(review: Review) {
    return this.http.post(this.url, review);
  }
  setList(listaNueva: Review[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Review>(`${this.url}/${id}`);
  }
  update(review: Review) {
    return this.http.put(this.url, review);
  }
  deleteR(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
