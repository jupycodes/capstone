import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {AlertController, NavController, Platform} from "@ionic/angular";
import {ClassesService} from "../../services/classes.service";
import {IClass} from "../../interfaces/iclass";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassRegService} from "../../services/class-reg.service";
import {UserService} from "../../services/user.service";
import {FilterDateService} from "../../services/filter-date.service";
import {Calendar} from "@ionic-native/calendar/ngx/index";


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
  cancelled = false;
  calendars =[];
  constructor(private navCtrl: NavController,
              private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private classRegService: ClassRegService,
              private userService: UserService,
              private alertController: AlertController,
              private filterDateService: FilterDateService,
              private calendar: Calendar,
              private plt: Platform,
              // private changeRef: ChangeDetectorRef
  ) {
    userService.matchCurrentUser(this.localUser.userId).subscribe((results) => {
      this.user = results;
    }, (err) => {
      console.log(err);
    });
    this.classDate = filterDateService.sendDate();
    //adding calendar plugin
    this.plt.ready().then(()=> {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      });
    });
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
    //add to waitlist button
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
    // const currentTime = (new Date()).toISOString().substring(0, 10) + ' ' + (new Date()).toTimeString().substring(0, 8);
    const timezoneOffset = (new Date()).getTimezoneOffset()*60000;
    const localISODateTime = (new Date(Date.now()- timezoneOffset)).toISOString().substring(0,10) + ' ' + (new Date()).toTimeString().substring(0, 8);
    // console.log(`class time: ${classTime}`);
    // console.log(`current time: ${currentTime}`);
    // console.log('timezone offset ' + new Date().getTimezoneOffset())
    // console.log('date to iso string ' +new Date().toISOString());
    // console.log('local iso date date ' + localISODateTime)
    return localISODateTime < classTime;
  }

  async register(classId, userId) {
    if (this.canRegister() === true
        && !this.attendees.includes(this.user.userId)
        && this.attendees.length < this.classDetails[0].classType.maxLimit) {
      if (this.user.membershipType === 'punchPass') {
        this.userService.updateMembership(-1, this.user.membershipType).subscribe(() => {
          //set timeout here
          // setTimeout(() => {
          //   window.location.reload();
          // });
        });
      }
      if (this.user.membershipType === 'none' || (this.user.membershipType === 'punchPass' && this.user.activeMembership === 0)) {
        await this.showAlert();
      } else if (this.user.membershipType === 'openGym' && this.classDetails[0].classType.name !== 'Open Gym') {
        await this.openGymAlert();
      } else {
        this.classRegService.register(classId, userId, this.classDate).subscribe(() => {
          // set timeout here
          // setTimeout(() => {
          //   window.location.reload();
          // });
        });
        await this.registrationSuccess();
        // setTimeout(() => {
        //   window.location.reload();
        // });
      }
    }
    if (this.attendees.includes(this.user.userId)) {
      await this.alreadyRegisteredAlert();
    }
    if (this.attendees.length === this.classDetails[0].classType.maxLimit) {
      await this.maxLimitAlert();
    }
  }
  cancelReg(){
    const userId = this.user.userId;
    const classId = this.classId;
    const date = this.classDate;
    this.classRegService.cancelReg(classId, userId, date).subscribe(() => {
      // set timeout here
      alert('Class registration is cancelled');
      // setTimeout(() => {
      //   window.location.reload();
      // });
    });
  }
  goToEdit() {
    this.classesService.getClassId(this.classId);
    this.navCtrl.navigateForward('admin-edit-class');
  }
  cancelClass(){
    this.cancelled = !this.cancelled;
  }
  addEvent(cal) {
    const startDate = new Date(this.classDate + ' ' + this.classDetails[0].startTime);
    const endDate = new Date(this.classDate + ' ' + this.classDetails[0].endTime);
    const options = { calendarId: cal.id, firstReminderMinutes: 60};
    const title = this.classDetails[0].classTypeId.name;
    const eventLocation = 'Frontier Performance';
    const notes = '';
    this.calendar.createEventInteractivelyWithOptions(title, eventLocation, notes, startDate, endDate, options).then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

}
