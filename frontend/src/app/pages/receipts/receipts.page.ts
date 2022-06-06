import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {
  purchases;
  user = JSON.parse(localStorage.getItem('currentUser')!);
  constructor(private purchaseService: PurchaseService) { }
  ionViewWillEnter(){
    this.purchaseService.getPurchases(this.user.userId).subscribe((results) => {
      this.purchases = results;
      this.purchases = this.purchases.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, (err) => {
      console.log(err);
    });
  }
  ngOnInit() {
  }

}