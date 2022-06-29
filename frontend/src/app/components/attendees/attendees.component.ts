import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss'],
})
export class AttendeesComponent {
  @Input() listAttendeeDetails: [];
  // @Input() attendeeDetails: string;
  // @Output() attendeeDetailsChanges = new EventEmitter();
  @Output() listAttendeeDetailsChange = new EventEmitter();
  constructor() { }
  // ngOnChanges() {
  //
  // }

}
