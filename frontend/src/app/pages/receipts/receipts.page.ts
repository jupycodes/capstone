import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import {NavController} from "@ionic/angular";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {
  purchases;
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  user;
  constructor(private purchaseService: PurchaseService,
              private navCtrl: NavController,
              private userService: UserService) {
    userService.matchCurrentUser(this.localUser.userId).subscribe((results) => {
      this.user = results;
    }, (err) => {
      console.log(err);
    });
  }
  ionViewWillEnter(){
    this.purchaseService.getPurchases(this.localUser.userId).subscribe((results) => {
      this.purchases = results;
      this.purchases = this.purchases.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, (err) => {
      console.log(err);
    });
  }
  ngOnInit() {
  }
  goBack() {
    this.navCtrl.navigateBack('/tabs/tab3');
  }
  goToCart() {
    this.navCtrl.navigateForward('/tabs/tab4');
  }

}
