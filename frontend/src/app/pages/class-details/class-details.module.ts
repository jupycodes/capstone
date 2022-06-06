import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassDetailsPageRoutingModule } from './class-details-routing.module';

import { ClassDetailsPage } from './class-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassDetailsPageRoutingModule
  ],
  declarations: [ClassDetailsPage]
})
export class ClassDetailsPageModule {}
