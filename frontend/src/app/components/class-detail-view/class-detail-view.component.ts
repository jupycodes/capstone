import { Component, OnInit, Input } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";
import {IClass} from "../../interfaces/iclass";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-class-detail-view',
  templateUrl: './class-detail-view.component.html',
  styleUrls: ['./class-detail-view.component.scss'],
})
export class ClassDetailViewComponent implements OnInit {
  classDetails;
  classId;

  constructor(private navCtrl: NavController,
                private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.classId = params.get('classId');
      this.classesService.getClass(this.classId).subscribe((results) => {
        this.classDetails = results;
        console.log(this.classDetails);
      }, (err) => {
        console.log(err);
      });
    });
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }
  register(){
    //register for class
  }
}
