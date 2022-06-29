import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddNewOptionPageRoutingModule } from './admin-add-new-option-routing.module';

import { AdminAddNewOptionPage } from './admin-add-new-option.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminAddNewOptionPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AdminAddNewOptionPage]
})
export class AdminAddNewOptionPageModule {}
