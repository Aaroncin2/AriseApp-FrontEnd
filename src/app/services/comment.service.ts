import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { Comment } from "../models/comment";
import { enviroment } from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import { HU62DTO } from "../models/HU62DTO";
import { HU61DTO } from "../models/HU61DTO";
const base_url = enviroment.base;

@Injectable({
  providedIn: "root",
})      
export class CommentService {
  private url = `${base_url}/comments`;
  private listaCambio = new Subject<Comment[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comment[]>(this.url);
  }

  insert(c: Comment) {
    return this.http.post(this.url, c);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Comment[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Comment>(`${this.url}/${id}`);
  }

  update(c: Comment) {
    return this.http.put(this.url, c);
  }

  deleteD(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getHU61DTO():Observable<HU61DTO[]>{
    return this.http.get<HU61DTO[]>(`${this.url}/HU61`);
  }
  getHU62DTO(): Observable<HU62DTO[]>{
    return this.http.get<HU62DTO[]>(`${this.url}/HU62`);
  }
}
