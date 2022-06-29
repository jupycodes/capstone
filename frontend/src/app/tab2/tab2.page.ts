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
  singleWorkout;
  selectDateForm: FormGroup;
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  user;
  showForm = false;
  adminAddNewForm;

  constructor(private workoutService: WorkoutService,
              private formBuilder: FormBuilder,
              ) {
    workoutService.getWorkouts().subscribe((results)=> {
      this.workouts = results;
    }, (err)=> {
      console.log(err);
    });
    this.adminAddNewForm = formBuilder.group({
      description: ['']
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
  showAddForm(){
    this.showForm = !this.showForm;
    this.singleWorkout = this.workoutExists();
  }
  addNew() {
    const formData = {
      date: this.selectDateForm.value.date,
      description: this.adminAddNewForm.value.description
    };
    this.workoutService.createWorkout(formData).subscribe(()=>{
      console.log(formData);
      this.showForm = !this.showForm;
      alert('New workout was added successfully');
      setTimeout(() => {
        window.location.reload();
      },1000);
    }, (err) => {
      alert('error');
    });
    // window.location.reload();
  }
  edit(){
    const formData = this.adminAddNewForm.value;
    const date = this.selectDateForm.value.date;
    this.workoutService.editWorkout(formData, date).subscribe(() => {
      console.log(formData);
      alert('Your changes have been saved.');
      setTimeout(() => {
        window.location.reload();
      },1000);
    });
    // window.location.reload();
  }
  workoutExists() {
    const date = this.selectDateForm.value.date;
    this.workoutService.getSingleWorkout(date).subscribe((results)=> {
      this.singleWorkout = results;
      // console.log(this.singleWorkout)
    }, (err)=> {
      console.log(err);
    });
    return this.singleWorkout !== undefined;
    // return this.singleWorkout
  }

}
