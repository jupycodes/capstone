import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NavController } from '@ionic/angular';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  // @Input() user;
  // @Output() userChange = new EventEmitter();
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
  getUser() {
    this.userService.matchCurrentUser(this.localUser.userId).subscribe((results) => {
      this.user = results;
      window.location.reload();
      // console.log(this.user);
    }, (err) => {
      console.log(err);
    });
  }
  // ionViewWillEnter() {
  //   this.getUser()
  // }
  viewPurchases(){
    this.navCtrl.navigateForward('receipts');
  }
  viewSettings(){
    this.navCtrl.navigateForward('settings');
  }
  editProfile() {
    console.log('hi');
  }
  ngOnInit(): void {
  }

}
