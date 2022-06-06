import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.page.html',
  styleUrls: ['./class-details.page.scss'],
})
export class ClassDetailsPage implements OnInit {

  constructor(private navCtrl: NavController, private classesService: ClassesService) { }

  ngOnInit() {
  }
  goBack(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }
  register(){
    //register for class
  }

}
