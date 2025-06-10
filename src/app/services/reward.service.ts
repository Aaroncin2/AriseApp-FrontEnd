import { Injectable } from '@angular/core';
import { Reward } from '../models/reward';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private url = `${base_url}/rewards`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Reward[]>(this.url);
  }
}
