import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IClass} from '../interfaces/iclass';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpClient: HttpClient) { }

  getClasses() {
    return this.httpClient.get<IClass[]>('http://localhost:3000/classes');
  }
  getClass(id) {
    return this.httpClient.get<IClass[]>(`http://localhost:3000/classes/${id}`);
  }
}
