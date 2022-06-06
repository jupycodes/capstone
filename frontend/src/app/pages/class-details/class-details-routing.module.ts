import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassDetailsPage } from './class-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClassDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassDetailsPageRoutingModule {}
