import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  allPurchases = history.state.data;
  prices = this.allPurchases.map((obj) => obj.price)
  totalCost = this.prices.reduce((acc,val) => {
  return acc + val;
}, 0);
  constructor(private navCtrl: NavController) { }
  printPurchases(){
    console.log(this.totalCost);
  }

  goBack(){
    this.navCtrl.navigateBack(('/tabs/tab4'));
  }
  ngOnInit() {}


}
