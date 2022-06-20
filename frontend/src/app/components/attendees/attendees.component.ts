import { Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss'],
})
export class AttendeesComponent implements OnChanges {
  @Input() listAttendeeDetails: [];
  constructor() { }
  ngOnChanges() {
    console.log(this.listAttendeeDetails)
  }

}
