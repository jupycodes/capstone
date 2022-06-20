import { Component, OnInit, Input } from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";
import {IClass} from "../../interfaces/iclass";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassRegService} from "../../services/class-reg.service";
import {UserService} from "../../services/user.service";
import {FilterDateService} from "../../services/filter-date.service";
// import {Calendar} from "@awesome-cordova-plugins/calendar/ngx";


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
  registrations;
  attendees = [] as any;
  attendeeDetails;
  listAttendeeDetails = [] as any;
  constructor(private navCtrl: NavController,
              private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private classRegService: ClassRegService,
              private userService: UserService,
              private alertController: AlertController,
              private filterDateService: FilterDateService,
              // private calendar: Calendar
  ) {
    userService.matchCurrentUser(this.localUser.userId).subscribe((results) => {
      this.user = results;
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
            console.log('Cancel button was clicked');
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
  async alreadyRegisteredAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'You are already registered for this class.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok button was pressed');
          }
        },
      ]
    });
    await alert.present();
  }
  async registrationSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'You are now registered for this class!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok button was pressed');
          }
        },
      ]
    });
    //add to calendar button?
    await alert.present();
  }
  async maxLimitAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'This class is already full',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok button was pressed');
          }
        },
      ]
    });
    //add to waitlist button?
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
    this.classRegService.listSignUps(this.classId).subscribe((results) => {
      this.registrations = results;
      for (const i of this.registrations) {
        if (i.date === this.classDate) {
          this.attendees.push(i.userId);
          // console.log(this.attendees);
        }
      }
      for (const i of this.attendees) {
        this.userService.matchCurrentUser(i).subscribe((result) =>{
          this.attendeeDetails = result;
          this.listAttendeeDetails.push(this.attendeeDetails.fName + ' ' + this.attendeeDetails.lName);
          // console.log(this.listAttendeeDetails)
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => {
      console.log(err);
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
    // console.log(this.classDetails[0].classType.maxLimit);
    // console.log(this.attendees.length);
    if (this.canRegister() === true
        && !this.attendees.includes(this.user.userId)
        && this.attendees.length < this.classDetails[0].classType.maxLimit) {
      if (this.user.membershipType === 'punchPass') {
        this.userService.updateMembership(-1, this.user.membershipType).subscribe(() => {
          // console.log(this.user);
        });
        // await this.registrationSuccess();
      }
      if (this.user.membershipType === 'none' || (this.user.membershipType === 'punchPass' && this.user.activeMembership === 0)) {
        await this.showAlert();
      } else if (this.user.membershipType === 'openGym' && this.classDetails[0].classType.name !== 'Open Gym') {
        await this.openGymAlert();
      } else {
        this.classRegService.register(classId, userId, this.classDate).subscribe(() => {
          // console.log('user registered');
          // console.log(this.user);
        });
        await this.registrationSuccess();
      }
    }
    if (this.attendees.includes(this.user.userId)) {
      await this.alreadyRegisteredAlert();
    }
    if (this.attendees.length === this.classDetails[0].classType.maxLimit) {
      await this.maxLimitAlert();
    }
  }
  cancel(){
    const userId = this.user.userId;
    const classId = this.classId;
    const date = this.classDate;
    this.classRegService.cancelReg(classId, userId, date).subscribe(() => {
      console.log({classId, userId, date});
      console.log('registration cancelled');
    });
  }
  // addEvent() {
  //   const startDate = new Date(2020, 5, 20, 6, 30, 0);
  //   const endDate = new Date(2020,5,20,7,30,0);
  //   const title = 'My nice event';
  //   const eventLocation = 'Home';
  //   const notes = 'Some notes about this event.';
  //   this.calendar.createEvent(title, eventLocation, notes, startDate, endDate).then(
  //     (msg) => { console.log(msg); },
  //     (err) => { console.log(err); }
  //   );
  // }

}
