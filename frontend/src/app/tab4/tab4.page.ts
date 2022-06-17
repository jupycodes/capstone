import { Component } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {PurchaseService} from "../services/purchase.service";

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  public purchases = [] as any;
  totalCost;
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController,
              private purchaseService: PurchaseService) {

  }

  async addToCart(purchase, instances, price) {
    this.purchases.push({purchase, instances, price});
    console.log(this.purchases);
    const toast = await this.toastCtrl.create({
      message: 'Purchase added to cart',
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'cart-outline',
          handler: () => {
            this.navCtrl.navigateForward('cart', {state: {data: this.purchases}});
          }
        }
      ]
    });
    await toast.present();
    this.totalCost = this.purchases.map((obj) => obj.price).reduce((acc,val) => acc + val, 0);
  }

  goToCart() {
    this.purchaseService.getList(this.purchases);
    this.navCtrl.navigateForward('cart');
    // this.navCtrl.navigateForward('cart', {state: {data: this.purchases}});
  }
  // listPreviousPurchases(){
  //   this.purchaseService.getPurchases(this.localUser.userId).subscribe((results) => {
  //     const length = results;
  //   }, (err) => {
  //     console.log(err);
  //   });
  //   return length;
  // }

}
