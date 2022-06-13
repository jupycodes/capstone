import { Component, OnInit, Input } from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";
import {IClass} from "../../interfaces/iclass";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassRegService} from "../../services/class-reg.service";
import {UserService} from "../../services/user.service";
import {FilterDateService} from "../../services/filter-date.service";

@Component({
  selector: 'app-class-detail-view',
  templateUrl: './class-detail-view.component.html',
  styleUrls: ['./class-detail-view.component.scss'],
})
export class ClassDetailViewComponent implements OnInit {
  classDetails;
  classId;
  localUser = JSON.parse(localStorage.getItem('currentUser')!);
  user;
  classDate;

  constructor(private navCtrl: NavController,
              private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private classRegService: ClassRegService,
              private userService: UserService,
              private alertController: AlertController,
              private filterDateService: FilterDateService) {
    userService.matchCurrentUser(this.localUser.userId).subscribe((results) => {
      this.user = results;
      // console.log(this.user);
    }, (err) => {
      console.log(err);
    });
    this.classDate = filterDateService.sendDate();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Please purchase membership or punch pass before registering for a class.',
      buttons: [
        {
          text: 'Purchase',
          handler: () => {
            this.navCtrl.navigateForward('/tabs/tab4');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel button was clicked')
          }
        },
      ]
    });
    await alert.present();
  }
  async openGymAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'You do not have a valid membership for this class type.',
      buttons: [
        {
          text: 'Purchase',
          handler: () => {
            this.navCtrl.navigateForward('/tabs/tab4');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel button was clicked');
          }
        },
      ]
    });
    await alert.present();
  }

  ngOnInit() {
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

  goBack() {
    this.navCtrl.navigateBack('/tabs/tab1');
  }
  canRegister() {
    const classTime = this.classDate + ' ' + this.classDetails[0].startTime;
    const currentTime = (new Date()).toISOString().substring(0, 10) + ' ' + (new Date()).toTimeString().substring(0, 8);
    return currentTime < classTime;
  }


  async register(classId, userId) {
    console.log(this.canRegister());
    if (this.canRegister() === true) {
      if (this.user.membershipType === 'punchPass') {
        this.userService.updateMembership(-1, this.user.membershipType).subscribe(() => {
          console.log(this.user);
        });
      }
      if (this.user.membershipType === 'none' || (this.user.membershipType === 'punchPass' && this.user.activeMembership === 0)) {
        await this.showAlert();
      } else if (this.user.membershipType === 'openGym' && this.classDetails[0].classType.name !== 'Open Gym') {
        await this.openGymAlert();
      } else {
        this.classRegService.register(classId, userId, this.classDate).subscribe(() => {
          console.log('user registered');
          console.log(this.user);
        });
      }
    }
  }
}
