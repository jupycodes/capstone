import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassRegService {

  constructor(private httpClient: HttpClient) { }
  register(classId, userId, date) {
    const data = {classId, userId, date};
    return this.httpClient.post(`http://localhost:3000/classRegistrations`, data);
  }
}
