import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {CartOptionServiceService} from "../../services/cart-option-service.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-add-new-option',
  templateUrl: './admin-add-new-option.page.html',
  styleUrls: ['./admin-add-new-option.page.scss'],
})
export class AdminAddNewOptionPage implements OnInit {
  addNewForm;
  constructor(private navCtrl: NavController,
              private cartOptionService: CartOptionServiceService,
              private formBuilder: FormBuilder) {
    this.addNewForm = formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      purchaseType: ['', [Validators.required]],
      instances: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }
  postOption(){
    const formData = this.addNewForm.value;
    this.cartOptionService.addNewCartOptions(formData).subscribe((result) =>{
      alert('Option was added successfully');
      setTimeout(() => {
        window.location.reload();
      });
    }, (err) => {
      console.log(err);
    });
  }
  goBack(){
    this.navCtrl.navigateBack(`/tabs/tab4`);
  }
}
