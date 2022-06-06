import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  workouts;
  selectDateForm: FormGroup;
  constructor(private workoutService: WorkoutService, private formBuilder: FormBuilder) {


    workoutService.getWorkouts().subscribe((results)=> {
      this.workouts = results;
    }, (err)=> {
      console.log(err);
    });
  }
  ngOnInit() {
    this.selectDateForm = this.formBuilder.group({
      date: new Date().toISOString().substring(0, 10)
    });
    this.changeDate();
  }
  changeDate(): void {
    this.selectDateForm.valueChanges.subscribe(val => {
      return val.date;
    });
  }

}
