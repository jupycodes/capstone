import { Component, OnInit } from '@angular/core';
import {AuthguardService} from "../../services/authguard.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public authGuard: AuthguardService, private navCtrl: NavController) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.navCtrl.navigateForward('login');
    console.log('user logged out');
  }
  goBack() {
    this.navCtrl.navigateBack('/tabs/tab3');
  }
  editProfile(){
    this.navCtrl.navigateForward('edit-profile');
  }
  changePassword(){
    this.navCtrl.navigateForward('change-password');
  }
  fakeButton(){
    console.log('hi')
  }
}
