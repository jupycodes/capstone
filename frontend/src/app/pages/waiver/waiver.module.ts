import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiverPageRoutingModule } from './waiver-routing.module';

import { WaiverPage } from './waiver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiverPageRoutingModule
  ],
  declarations: [WaiverPage]
})
export class WaiverPageModule {}
