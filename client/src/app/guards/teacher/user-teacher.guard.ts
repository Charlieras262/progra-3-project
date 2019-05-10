import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserTeacherGuard implements CanActivate {
  constructor(private router: Router,
    public authService: AuthenticateService,
    public translate: TranslateService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('user') === null) {
        this.router.navigate(['/login']);
        this.translate.get('teacher_guard_msg').subscribe(res => {
          $.toaster(res, '<i class="fa fa-exclamation-triangle"></i>', 'info');
        });
        return false;
      } else {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user.type == 'T') {
          return true;
        } else {
          switch(user.type){
            case 'A':
            this.router.navigate(['/dashboard']);
            break;
            case 'S':
            this.router.navigate(['/coursesasigned']);
            break;
            default:
            this.router.navigate(['/profile']);
            break;
          }
          return false;
        }
      }
  }
}
