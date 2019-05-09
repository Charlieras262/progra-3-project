import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public translateService: TranslateService,
    public authService: AuthenticateService) { }

  ngOnInit() {
  }

  onLoginUser(){
    const valfields = {email: false, password: false}
    valfields.email = this.authService.checkField(this.email, 'email');
    valfields.password = this.authService.checkField(this.password, 'password');
    if(valfields.email && valfields.password){
      console.log({
        email: this.email,
        password: this.password
      });
    }
  }

}
