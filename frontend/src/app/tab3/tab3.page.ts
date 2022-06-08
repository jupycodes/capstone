import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user = JSON.parse(localStorage.getItem('currentUser')!);

  constructor(private navCtrl: NavController) {}

  viewPurchases(){
    this.navCtrl.navigateForward('receipts');
  }
  viewSettings(){
    this.navCtrl.navigateForward('settings');
  }

  ngOnInit(): void {}

}
