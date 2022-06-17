import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Iworkouts} from '../interfaces/iworkouts';
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private httpClient: HttpClient) { }

  getWorkouts() {
    return this.httpClient.get<Iworkouts[]>(`http://localhost:3000/workouts`);
  }
  getSingleWorkout(date) {
    return this.httpClient.get<Iworkouts[]>(`http://localhost:3000/workouts/${date}`);
  }
  createWorkout(formData: object) {
    return this.httpClient.post<Iworkouts[]>(`http://localhost:3000/workouts`, formData);
  }
  editWorkout(formData, date) {
    return this.httpClient.patch<Iworkouts[]>(`http://localhost:3000/workouts/${date}`, formData);
  }
}
