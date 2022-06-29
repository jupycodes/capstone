import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddNewClassPage } from './admin-add-new-class.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddNewClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddNewClassPageRoutingModule {}
