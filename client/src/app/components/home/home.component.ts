import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeLang = 'en'

  constructor(private translate: TranslateService,
    public authService: AuthenticateService) { }

  ngOnInit() {
    $('.txt').html(function (i, html) {
      var chars = $.trim(html).split("");

      return '<span>' + chars.join('</span><span>') + '</span>';
    });
  }

  getRoute() {
    if (!this.authService.loggedIn()) {
      return '/login'
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      switch (user.type) {
        case 'S':
        return '/dashboard/001';            
        case 'P':
        return '/dashboard/010';
        case 'E':
        return '/dashboard/100';
        default:
          return '/home'
      }
    }
  }

  changeLanguage(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}
