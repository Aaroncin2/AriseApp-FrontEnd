import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { Comment } from "../models/comment";
import { enviroment } from "../../environments/environment";
import { Subject } from "rxjs";
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
}
