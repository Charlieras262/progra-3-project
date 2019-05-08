import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
   }

  ngOnInit() {
  }

  getDashboardRoute(){
    return '/dashboard/100'
  }

  onLogoutClick(){
    this.translateService.use('es')
  }

}
