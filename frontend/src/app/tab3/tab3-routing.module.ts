import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import {AuthguardService} from '../services/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthguardService]
})
export class Tab3PageRoutingModule {}
