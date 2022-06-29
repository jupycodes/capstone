import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  editForm;
  constructor(private navCtrl: NavController,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.editForm = formBuilder.group({
      fName: [this.localUser.fName],
      lName: [this.localUser.lName],
      email: [this.localUser.email],
      phoneNumber: [this.localUser.phoneNumber],
      birthday: [this.localUser.birthday],
      gender: [this.localUser.gender]
    });
  }

  ngOnInit() {
  }
  editProfile() {
    const formData = this.editForm.value;
    this.userService.editProfile(formData).subscribe((result) => {
      alert('Your changes have been saved.');
      setTimeout(() => {
        window.location.reload();
      });
    }, (err) => {
      alert('There was an error while saving your changes.');
      console.log(err);
    });
  }
  goBack(){
    this.navCtrl.navigateBack('settings');
  }
}
