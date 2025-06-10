import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environments/environment';
import { Forum } from '../models/forum';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private url = `${base_url}/forums`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Forum[]>(this.url);
  }
}
