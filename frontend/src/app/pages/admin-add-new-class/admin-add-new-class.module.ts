import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddNewClassPageRoutingModule } from './admin-add-new-class-routing.module';

import { AdminAddNewClassPage } from './admin-add-new-class.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminAddNewClassPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AdminAddNewClassPage]
})
export class AdminAddNewClassPageModule {}
