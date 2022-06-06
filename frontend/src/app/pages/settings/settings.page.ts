import { Component, OnInit } from '@angular/core';
import {AuthguardService} from "../../services/authguard.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public authGuard: AuthguardService) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    console.log('user logged out');
  }
}
