import { Component, OnInit, Input } from '@angular/core';
import { IClass } from 'src/app/interfaces/iclass';
import { ClassesService } from 'src/app/services/classes.service';
import {ClassTypeService} from '../../services/class-type.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {

  @Input() class!: IClass;
  constructor(private classService: ClassesService, private classTypeService: ClassTypeService, private navCtrl: NavController) { }
  viewDetails(classId) {
    this.navCtrl.navigateForward(`class-details/${classId}`);
  }

  ngOnInit() {}

}
