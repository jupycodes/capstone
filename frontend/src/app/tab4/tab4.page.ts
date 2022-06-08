import { Component } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  public purchases = [] as any;
  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {  }

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
  }

  goToCart() {
    this.navCtrl.navigateForward('cart', {state: {data: this.purchases}});
  }

}
