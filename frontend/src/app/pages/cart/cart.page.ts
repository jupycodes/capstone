import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {PurchaseService} from "../../services/purchase.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  allPurchases;
  prices;
  totalCost;
  instances;
  totalInstances;
  type;
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  paymentForm;
  constructor(private navCtrl: NavController,
              private userService: UserService,
              private purchaseService: PurchaseService,
              private formBuilder: FormBuilder) {
    this.allPurchases = purchaseService.sendList();
    this.prices = this.allPurchases.map((obj) => obj.price);
    this.totalCost = this.prices.reduce((acc,val) => acc + val, 0);
    this.instances = this.allPurchases.map((obj) => obj.instances);
    this.totalInstances = this.instances.reduce((acc,val) => acc + val, 0);
    this.type = this.allPurchases.map((obj) =>obj.purchase)[0];

    this.paymentForm = formBuilder.group({
      name: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });
  }
  processPayment(activeMembership, membershipType){
    if (this.localUser === null) {
      this.navCtrl.navigateForward('login');
    } else {
      this.userService.updateMembership(activeMembership, membershipType).subscribe(() =>{
        // console.log(this.paymentForm);
      });
      const date = new Date().toISOString().substring(0, 10);
      this.purchaseService.generatePurchase(this.type, this.totalCost, date, this.localUser.userId).subscribe(() => {
        console.log(this.paymentForm.value);
      });
      this.navCtrl.navigateForward('/tabs/tab4');
    }
  }
  goBack(){
    this.navCtrl.navigateBack(('/tabs/tab4'));
  }
  deletePurchase(item){
    this.purchaseService.deleteFromCart(item);
  }
  ngOnInit() {
  }


}
