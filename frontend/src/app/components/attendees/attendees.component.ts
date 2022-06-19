import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss'],
})
export class AttendeesComponent implements OnInit {
  @Input() listAttendeeDetails: [];
  constructor() { }
  ngOnInit() {
  }

}
