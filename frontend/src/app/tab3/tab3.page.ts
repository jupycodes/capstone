import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  user;
  constructor(private navCtrl: NavController,
              private userService: UserService) {
    userService.matchCurrentUser(this.localUser.userId).subscribe((results) => {
      this.user = results;
      // console.log(this.user);
    }, (err) => {
      console.log(err);
    });
  }
  viewPurchases(){
    this.navCtrl.navigateForward('receipts');
  }
  viewSettings(){
    this.navCtrl.navigateForward('settings');
  }
  ngOnInit(): void {
  }

}
