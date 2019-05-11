import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  valfields = { email: false, password: false }
  socket: any;

  constructor(public translateService: TranslateService,
    public authService: AuthenticateService,
    public router: Router) { }

  ngOnInit() {
    this.checkEmailField();
    this.checkPassField();
    this.socket = ProjectVariable.socket;
  }

  onLoginUser() {
    this.valfields.email = this.authService.valEmailFormat(this.email);
    this.valfields.password = this.authService.checkField(this.password, 'password');
    if (this.valfields.email && this.valfields.password) {
      this.authService.authUserCredentials({ email: this.email, password: this.password }, 'l')
        .subscribe(res => {
          var data = JSON.parse(JSON.stringify(res));
          if (data.success) {
            this.translateService.get('welcome').subscribe(res => {
              $.toaster(`${res} ${data.user.username}!`, '<i class="fa fa-check-circle"></i>', 'success');
            });
            this.authService.storeUserData(data.token, data.user);
            this.socket.emit('connected', data.user.username);
            switch (data.user.type) {
              case 'A':
                this.router.navigate(['/dashboard/0010']);
                break;
              case 'P':
                this.router.navigate(['/dashboard/0100']);
                break;
              case 'E':
                this.router.navigate(['/dashboard/1000']);
                break;
              case 'S':
                this.router.navigate(['/dashboard/0001']);
                break;
              default:
                this.router.navigate(['/home']);
                break;
            }
          } else {
            $.toaster(data.msg, '<i class="fa fa-times"></i>', 'danger');
            if (data.node === 'email') {
              this.authService.checkIfField(false, 'email');
            } else {
              this.authService.checkIfField(false, 'password');
            }
          }
        });;
    }
  }

  checkEmailField() {
    const node = document.getElementById('email');
    node.addEventListener('input', event => this.valfields.email = this.authService.valEmailFormat(this.email));
  }

  checkPassField() {
    const node = document.getElementById('password');
    node.addEventListener('input', event => this.valfields.password = this.authService.checkField(this.password, 'password'));
  }
}
