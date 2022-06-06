import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private navCtrl: NavController) {
    this.registerForm = formBuilder.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      birthday: [''],
      gender: ['']
    }, {validator: this.checkPasswords});
   }
   checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
   }

  ngOnInit() {
  }
  register(){
    const formData = this.registerForm.value;
    this.userService.register(formData).subscribe((result)=>{
      alert('Registration was successful');
    },(err)=> {
      alert('Registration failed');
      console.log(err);
    });
    this.navCtrl.back();
  }

}
