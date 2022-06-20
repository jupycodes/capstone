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
  listSignUps(classId) {
    return this.httpClient.get(`http://localhost:3000/classRegistrations/${classId}`);
  }
  cancelReg(classId, userId, date) {
    return this.httpClient.delete(`http://localhost:3000/classRegistrations/${classId}/${userId}/${date}`);
  }
}
