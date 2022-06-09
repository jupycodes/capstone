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
  constructor(private navCtrl: NavController,
              private userService: UserService,
              private purchaseService: PurchaseService) { }
  processPayment(data){
    this.userService.updateMembership(data).subscribe(() =>{
      console.log('payment processed');
    });
  }

  goBack(){
    this.navCtrl.navigateBack(('/tabs/tab4'));
  }
  ngOnInit() {}


}
