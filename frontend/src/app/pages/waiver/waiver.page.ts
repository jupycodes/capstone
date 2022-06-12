import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.page.html',
  styleUrls: ['./waiver.page.scss'],
})
export class WaiverPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  acceptTerms() {
    this.navCtrl.navigateForward('register');
  }
  cancelButton() {
    this.navCtrl.navigateForward('register');
  }

}
