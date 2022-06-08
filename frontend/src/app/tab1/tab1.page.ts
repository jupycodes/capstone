import { Component, OnDestroy, OnInit} from '@angular/core';
import { ClassesService } from '../services/classes.service';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ClassTypeService} from "../services/class-type.service";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {
  classes;
  classTypes;
  public initialValue;
  selectDateForm: FormGroup;
  selectClassTypeForm: FormGroup =new FormGroup({
    classType: new FormControl('all')
  });
  constructor(private classesService: ClassesService, private classTypeService: ClassTypeService, private formBuilder: FormBuilder) {}
  ionViewWillEnter(){
    this.classesService.getClasses().subscribe((results) => {
      this.classes = results;
      this.classes = this.classes.sort((a,b) => a.startTime - b.startTime);
    }, (err) => {
      console.log(err);
    });
    this.classTypeService.getClassType().subscribe((results) => {
      this.classTypes = results;
    }, (err) => {
      console.log(err);
    });
  }
  //filter by date
  ngOnInit() {
    this.selectDateForm = this.formBuilder.group({
      date: new Date().toLocaleString('en-us', {  weekday: 'long' })
    });
    this.initialValue = this.selectDateForm.value.date;
    this.changeDate();
  }
  ngOnDestroy(): void {
      if (this.initialValue != this.selectDateForm.value) {
        this.changeDate();
      }
  }
  changeDate() {
    this.selectDateForm.valueChanges.subscribe(val => {
      const n = new Date(val.date);
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      this.selectDateForm.value.date = weekday[n.getDay()+1];
    });
  }




}
