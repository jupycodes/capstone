import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditClassPage } from './admin-edit-class.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditClassPageRoutingModule {}
