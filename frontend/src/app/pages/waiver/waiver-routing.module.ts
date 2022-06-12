import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiverPage } from './waiver.page';

const routes: Routes = [
  {
    path: '',
    component: WaiverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiverPageRoutingModule {}
