import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ClassDetailViewComponent} from './components/class-detail-view/class-detail-view.component';
import {AuthguardService} from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'receipts',
    loadChildren: () => import('./pages/receipts/receipts.module').then( m => m.ReceiptsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'class-details',
    loadChildren: () => import('./pages/class-details/class-details.module').then( m => m.ClassDetailsPageModule)
  },
  {
    path: 'class-details/:classId', component: ClassDetailViewComponent, canActivate: [AuthguardService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthguardService]
})
export class AppRoutingModule {}