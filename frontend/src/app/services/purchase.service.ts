import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPurchases } from '../interfaces/ipurchases';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) { }

  getPurchases(userId) {
    return this.httpClient.get<IPurchases>(`http://localhost:3000/purchases/${userId}`);
  }
}
