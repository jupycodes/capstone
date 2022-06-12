import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {NavController} from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private navCtrl: NavController) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required]]
    });
   }

  ngOnInit() {
  }

  login() {
    const formData = this.loginForm.value;
    this.userService.login(formData).subscribe((result)=> {
      localStorage.setItem('currentUser', JSON.stringify(result));
      console.log(result);
    }, (err)=> {
      alert('incorrect email/password');
      console.log(err);
    });
    this.navCtrl.navigateForward('/tabs/tab1');
  }
  register() {
    this.navCtrl.navigateForward('register');
  }

}
