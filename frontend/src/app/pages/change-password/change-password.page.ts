import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  editForm;
  constructor(private navCtrl: NavController,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.editForm = formBuilder.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.checkPasswords});
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {
  }
  changePassword() {
    const formData = {password: this.editForm.value.password};
    if (this.localUser.password === this.editForm.value.currentPassword){
      this.userService.editProfile(formData).subscribe((result) => {
        alert('Your changes have been saved.');
      }, (err) => {
        alert('There was an error while saving your changes.');
        console.log(err);
      });
    } else {
      alert('Incorrect password');
    }
  }
  goBack(){
    this.navCtrl.navigateBack('settings');
  }
}
