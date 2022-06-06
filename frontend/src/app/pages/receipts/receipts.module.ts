import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReceiptsPageRoutingModule } from './receipts-routing.module';
import { ReceiptsPage } from './receipts.page';
import {PuchaseComponent} from '../../components/puchase/puchase.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptsPageRoutingModule
  ],
  declarations: [ReceiptsPage, PuchaseComponent]
})
export class ReceiptsPageModule {}
