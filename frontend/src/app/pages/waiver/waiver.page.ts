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
  okBtn() {
    this.navCtrl.navigateForward('register');
  }


}
