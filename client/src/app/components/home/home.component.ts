import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { StudentService } from 'src/app/services/students/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students = 0
  teachers = 0
  institutions = 0
  courses = 0

  constructor(public authService: AuthenticateService, 
    public servicioEstudiantes: StudentService,
    public teacherService: TeacherService) { }

  ngOnInit() {
    this.getStudentsAmount();
    this.getTeachersAmount();
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

  getStudentsAmount() {
    this.servicioEstudiantes.getStudentsAmount().subscribe(res => {
      this.students = res as number;
    });
  }

  getTeachersAmount() {
    this.teacherService.getTeachersAmount().subscribe(res => {
      this.teachers = res as number;
    });
  }
}
