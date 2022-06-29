import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IClass} from '../interfaces/iclass';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  classIdEdit;
  constructor(private httpClient: HttpClient) { }

  getClasses() {
    return this.httpClient.get<IClass[]>('https://capstone-proj-123.herokuapp.com/classes');
  }
  getClass(id) {
    return this.httpClient.get<IClass[]>(`https://capstone-proj-123.herokuapp.com/classes/${id}`);
  }
  editClassDetails(data, classId) {
    return this.httpClient.patch(`https://capstone-proj-123.herokuapp.com/editClass/${classId}`,data);
  }
  delete(classId) {
    return this.httpClient.delete(`https://capstone-proj-123.herokuapp.com/classes/${classId}`);
  }
  addNewClass(formData) {
    return this.httpClient.post('https://capstone-proj-123.herokuapp.com/classes', formData);
  }
  getClassId(value) {
    this.classIdEdit = value;
  }
  sendClassId() {
    return this.classIdEdit;
  }
}
