import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Iworkouts} from '../interfaces/iworkouts';
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private httpClient: HttpClient) { }
  
  getWorkouts() {
    return this.httpClient.get<Iworkouts[]>(`http://localhost:3000/workouts`)
  }
}