import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassRegService {

  constructor(private httpClient: HttpClient) { }
  register(classId, userId, date) {
    const data = {classId, userId, date};
    return this.httpClient.post(`https://capstone-proj-123.herokuapp.com/classRegistrations`, data);
  }
  listSignUps(classId) {
    return this.httpClient.get(`https://capstone-proj-123.herokuapp.com/classRegistrations/${classId}`);
  }
  cancelReg(classId, userId, date) {
    return this.httpClient.delete(`https://capstone-proj-123.herokuapp.com/classRegistrations/${classId}/${userId}/${date}`);
  }
}
