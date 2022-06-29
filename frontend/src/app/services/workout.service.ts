import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Iworkouts} from '../interfaces/iworkouts';
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private httpClient: HttpClient) { }

  getWorkouts() {
    return this.httpClient.get<Iworkouts[]>(`https://capstone-proj-123.herokuapp.com/workouts`);
  }
  getSingleWorkout(date) {
    return this.httpClient.get<Iworkouts[]>(`https://capstone-proj-123.herokuapp.com/workouts/${date}`);
  }
  createWorkout(formData: object) {
    return this.httpClient.post<Iworkouts[]>(`https://capstone-proj-123.herokuapp.com/workouts`, formData);
  }
  editWorkout(formData, date) {
    return this.httpClient.patch<Iworkouts[]>(`https://capstone-proj-123.herokuapp.com/workouts/${date}`, formData);
  }
}
