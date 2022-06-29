import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(formData: object){
    return this.httpClient.post('https://capstone-proj-123.herokuapp.com/login', formData);
  }
  register(formData: object){
    return this.httpClient.post('https://capstone-proj-123.herokuapp.com/register', formData);
  }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser')!);
  }
  matchCurrentUser(userId){
    return this.httpClient.get<IUsers>(`https://capstone-proj-123.herokuapp.com/users/${userId}`);
  }
  isAuthenticated(){
    return !!this.getCurrentUser();
  }
  updateMembership(activeMembership, membershipType){
    const data = {activeMembership, membershipType};
    return this.httpClient.patch(`https://capstone-proj-123.herokuapp.com/users/${this.getCurrentUser().userId}`,data);
  }
  editProfile(data){
    return this.httpClient.patch(`https://capstone-proj-123.herokuapp.com/editProfile/${this.getCurrentUser().userId}`,data);
  }

}
