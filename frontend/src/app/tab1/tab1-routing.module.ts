import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { ClassComponent } from '../components/class/class.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, CommonModule],
  declarations: [
    ClassComponent
  ],
    exports: [RouterModule, ClassComponent]
})
export class Tab1PageRoutingModule {}
