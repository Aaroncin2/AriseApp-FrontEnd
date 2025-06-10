import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation } from '../models/donations';
import { enviroment } from '../../environments/environment';
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private url = `${base_url}/donations`;
  private base_url = enviroment.base;
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Donation[]>(this.url);
  }
}
