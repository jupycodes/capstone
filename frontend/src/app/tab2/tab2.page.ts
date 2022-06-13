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
      date: this.selectDateForm,
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
  }
  addNew() {
    const formData = this.adminAddNewForm.value;
    this.workoutService.createWorkout(formData).subscribe(()=>{
      console.log(formData);
      this.showForm = !this.showForm;
      alert('New workout was added successfully');
    }, (err) => {
      alert('error');
    });
  }
  edit(){
    const formData = this.adminAddNewForm.value;
    this.workoutService.editWorkout(formData, formData.date).subscribe(() => {
      console.log(formData);
    });
  }

}
