import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPurchases } from '../interfaces/ipurchases';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  cartList;
  constructor(private httpClient: HttpClient) { }

  getPurchases(userId) {
    return this.httpClient.get<IPurchases>(`http://localhost:3000/purchases/${userId}`);
  }
  generatePurchase(type, price, date, userId) {
    const data = {type, price, date, userId};
    return this.httpClient.post('http://localhost:3000/purchases', data);
  }
  getList(value) {
    this.cartList = value;
  }
  sendList() {
    return this.cartList;
  }
  deleteFromCart(i) {
    return this.cartList.splice(i,1);
  }
}
