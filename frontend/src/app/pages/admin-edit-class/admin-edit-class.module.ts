import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEditClassPageRoutingModule } from './admin-edit-class-routing.module';

import { AdminEditClassPage } from './admin-edit-class.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminEditClassPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AdminEditClassPage]
})
export class AdminEditClassPageModule {}
