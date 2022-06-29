import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ClassTypeService} from "../../services/class-type.service";

@Component({
  selector: 'app-admin-add-new-class',
  templateUrl: './admin-add-new-class.page.html',
  styleUrls: ['./admin-add-new-class.page.scss'],
})
export class AdminAddNewClassPage implements OnInit {
  addNewForm;
  classTypes;
  constructor(private navCtrl: NavController,
              private classesService: ClassesService,
              private formBuilder: FormBuilder,
              private classTypeService: ClassTypeService) {
    this.addNewForm = formBuilder.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      day: ['', [Validators.required]],
      classTypeId: ['', [Validators.required]],
    });
  }
  ionViewWillEnter() {
    this.classTypeService.getClassType().subscribe((results) => {
      this.classTypes = results;
      // console.log(this.classTypes);
    }, (err) => {
      console.log(err);
    });
  }
  ngOnInit() {
  }
  postClass() {
    const formData = this.addNewForm.value;
    this.classesService.addNewClass(formData).subscribe((result) =>{
      alert('Class was added successfully');
      setTimeout(() => {
        window.location.reload();
      });
    }, (err) => {
      console.log(err);
    });
  }
  goBack(){
    this.navCtrl.navigateBack(`/tabs/tab1`);
  }
}
