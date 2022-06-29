import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddNewOptionPage } from './admin-add-new-option.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddNewOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddNewOptionPageRoutingModule {}
