import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { StudentService } from 'src/app/services/students/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  socket: any;
  students = 0
  teachers = 0
  institutions = 0
  courses = 0

  constructor(public authService: AuthenticateService,
    public servicioEstudiantes: StudentService,
    public teacherService: TeacherService,
    public instService: InstitutionsService,
    public coursesService: CoursesService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.updateHomeInfo();
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

  updateHomeInfo() {
    this.socket.on('updateHome', () => {
      this.getStudentsAmount();
      this.getTeachersAmount();
      this.getCoursesAmount();
      this.getInstitutionsAmount();
    });
    this.socket.emit('updateHome');
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

  getCoursesAmount() {
    this.coursesService.getCoursesAmount().subscribe(res => {
      this.courses = res as number;
    });
  }

  getInstitutionsAmount() {
    this.instService.getInstitutionsAmount().subscribe(res => {
      this.institutions = res as number;
    });
  }
}
