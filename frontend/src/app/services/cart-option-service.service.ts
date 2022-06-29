import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartOptionServiceService {

  constructor(private httpClient: HttpClient) { }

  getCartOptions() {
    return this.httpClient.get('https://capstone-proj-123.herokuapp.com/cartOptions');
  }
  addNewCartOptions(formData){
    return this.httpClient.post('https://capstone-proj-123.herokuapp.com/cartOptions', formData);
  }
  deleteCartOption(cartId){
    return this.httpClient.delete(`https://capstone-proj-123.herokuapp.com/cartOptions/${cartId}`);
  }
}
