import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {ClassDetailViewComponent} from "./components/class-detail-view/class-detail-view.component";
import {AttendeesComponent} from "./components/attendees/attendees.component";
import {Calendar} from "@ionic-native/calendar/ngx/index";


@NgModule({
    declarations: [AppComponent, ClassDetailViewComponent, AttendeesComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Calendar],
  bootstrap: [AppComponent],
})
export class AppModule {}
