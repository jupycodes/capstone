import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {PurchaseService} from "../../services/purchase.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  allPurchases = history.state.data;
  prices = this.allPurchases.map((obj) => obj.price);
  totalCost = this.prices.reduce((acc,val) => acc + val, 0);
  instances = this.allPurchases.map((obj) => obj.instances);
  totalInstances = this.instances.reduce((acc,val) => acc + val, 0);
  type = this.allPurchases.map((obj) =>obj.purchase)[0];
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  constructor(private navCtrl: NavController,
              private userService: UserService,
              private purchaseService: PurchaseService) {
  }
  processPayment(activeMembership, membershipType){
    if (this.localUser === null) {
      this.navCtrl.navigateForward('login');
    } else {
      this.userService.updateMembership(activeMembership, membershipType).subscribe(() =>{
        console.log('payment processed');
      });
      this.navCtrl.navigateForward('/tabs/tab4');
      // window.location.reload();
    }
  }
  goBack(){
    this.navCtrl.navigateBack(('/tabs/tab4'));
  }
  ngOnInit() {
  }


}
