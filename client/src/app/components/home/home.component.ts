import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeLang = 'en'

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    $('.txt').html(function(i, html) {
      var chars = $.trim(html).split("");
    
      return '<span>' + chars.join('</span><span>') + '</span>';
    });
  }

  getRoute(){
    return '/login';
  }

  changeLanguage(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}
