import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterDateService {
  filterDate;
  constructor() { }
  getDate(value) {
    this.filterDate = value;
  }
  sendDate() {
    return this.filterDate;
  }
}

//https://www.c-sharpcorner.com/article/angular-services-for-sharing-data-between-component-using-angular-and-above/
