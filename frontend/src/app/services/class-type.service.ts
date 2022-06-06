import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IClassType} from '../interfaces/iclass-type';
@Injectable({
  providedIn: 'root'
})
export class ClassTypeService {

  constructor(private httpClient: HttpClient) { }
  getClassType() {
    return this.httpClient.get<IClassType[]>('http://localhost:3000/classType');
  }
}
