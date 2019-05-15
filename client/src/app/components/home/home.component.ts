import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { StudentService } from 'src/app/services/students/student.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeLang = 'en'
  estudiantes = 0
  maestros = 0
  instituciones = 0
  cursos = 0

  constructor(private translate: TranslateService,
    public authService: AuthenticateService, public servicioEstudiantes: StudentService) { }

  ngOnInit() {
    this.getStudentsAmount();
  }

  getRoute() {
    if (!this.authService.loggedIn()) {
      return '/login'
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      switch (user.type) {
        case 'S':
          return '/dashboard/0001';
        case 'A':
          return '/dashboard/0010';
        case 'P':
          return '/dashboard/0100';
        case 'E':
          return '/dashboard/1000';
        default:
          return '/home'
      }
    }
  }

  changeLanguage(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }

  getStudentsAmount() {
    this.servicioEstudiantes.getStudentsAmount().subscribe(res => {
      this.estudiantes = res as number;
    });
  }
}
