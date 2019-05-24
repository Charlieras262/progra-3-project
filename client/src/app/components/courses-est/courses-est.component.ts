import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-courses-est',
  templateUrl: './courses-est.component.html',
  styleUrls: ['./courses-est.component.css']
})
export class CoursesEstComponent implements OnInit {

  socket: any;
  loading = true;

  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    //this.getCourses();
    this.getCoursesSocket();
  }

  getCoursesSocket(){
    const user = this.studentService.loadUser();
    this.socket.on('getCourse', () => {
      this.getCourses();
      this.loading = false;
    });
    this.socket.emit('getCourse');
  }

  getCourses(){
    const user = this.studentService.loadUser();
    this.studentService.getStudent(user.code).subscribe(res => {
      const data = JSON.parse(JSON.stringify(res));
      this.studentService.courses = data.course_asigned;
    })
  }

}
