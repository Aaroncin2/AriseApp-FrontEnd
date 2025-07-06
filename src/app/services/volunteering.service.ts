import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import { Volunteering } from "../models/volunteering";
import { HU59DTO } from "../models/HU59DTO";
const base_url = enviroment.base;

@Injectable({
  providedIn: "root",
})      
export class VolunteeringService {
  private url = `${base_url}/volunteerings`;
  private listaCambio = new Subject<Volunteering[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Volunteering[]>(this.url);
  }

  insert(v: Volunteering) {
    return this.http.post(this.url, v);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Volunteering[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Volunteering>(`${this.url}/${id}`);
  }

  update(v: Volunteering) {
    return this.http.put(this.url, v);
  }

  deleteD(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getHU59DTO(): Observable<HU59DTO[]> {
    return this.http.get<HU59DTO[]>(`${this.url}/HU59`);
  }
}
