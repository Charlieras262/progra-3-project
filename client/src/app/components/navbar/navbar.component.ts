import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(public translateService: TranslateService,
    public authService: AuthenticateService) {
    const lang = window.navigator.language || navigator.language;
    this.translateService.setDefaultLang(lang);
  }

  ngOnInit() {

  }

  getDashboardRoute() {
    return '/dashboard/100'
  }

  onLogoutClick() {
    this.authService.logout();

  }
}
