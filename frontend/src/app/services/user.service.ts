import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(formData: object){
    return this.httpClient.post('http://localhost:3000/login', formData);
  }
  register(formData: object){
    return this.httpClient.post('http://localhost:3000/register', formData);
  }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser')!);
  }
  isAuthenticated(){
    return !!this.getCurrentUser();
  }
  updateMembership(activeMembership){
    const data = {activeMembership};
    return this.httpClient.post(`http://localhost:3000/users/${this.getCurrentUser().userId}`,data);
  }

}
