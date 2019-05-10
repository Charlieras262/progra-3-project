import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserStudentGuard implements CanActivate {
  constructor(private router: Router,
    public authService: AuthenticateService,
    public translate: TranslateService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
      this.translate.get('student_guard_msg').subscribe(res => {
        $.toaster(res, '<i class="fa fa-exclamation-triangle"></i>', 'info');
      });
      return false;
    } else {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user.type == 'E') {
        return true;
      } else {
        switch(user.type){
          case 'S':
          this.router.navigate(['/dashboard/001']);
          break;
          case 'P':
          this.router.navigate(['/dashboard/010']);
          break;
          default:
          this.router.navigate(['/home']);
          break;
        }
        return false;
      }
    }
  }
}
