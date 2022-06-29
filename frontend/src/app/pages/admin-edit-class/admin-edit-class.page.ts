import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";
import {FormBuilder} from "@angular/forms";
import {ClassTypeService} from "../../services/class-type.service";

@Component({
  selector: 'app-admin-edit-class',
  templateUrl: './admin-edit-class.page.html',
  styleUrls: ['./admin-edit-class.page.scss'],
})
export class AdminEditClassPage implements OnInit {
  classId;
  editForm;
  classDetails;
  classTypes;
  constructor(private navCtrl: NavController,
              private classesService: ClassesService,
              private formBuilder: FormBuilder,
              private classTypeService: ClassTypeService) {
    this.classId = classesService.sendClassId();
    classesService.getClass(this.classId).subscribe((results) => {
      this.classDetails = results[0];
      console.log(this.classDetails);
    }, (err) => {
      console.log(err);
    });
    this.editForm = formBuilder.group({
      startTime: [],
      endTime: [],
      day: [],
      classTypeId: [],
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
  editDetails() {
    const formData = this.editForm.value;
    this.classesService.editClassDetails(formData, this.classId).subscribe((result)=> {
      console.log(formData);
      alert('Your changes have been saved.');
      setTimeout(() => {
        window.location.reload();
      });
      this.navCtrl.navigateForward('/tabs/tab1');
    }, (err) => {
      alert('There was an error while saving your changes.');
      console.log(err);
    });
  }
  deleteClass() {
    this.classesService.delete(this.classId).subscribe(() => {
      alert('Your changes have been saved.');
      setTimeout(() => {
        window.location.reload();
      });
      // this.navCtrl.navigateBack(`class-details/${this.classId}`);
    });
  }
  goBack(){
    this.navCtrl.navigateBack(`class-details/${this.classId}`);
  }
}
