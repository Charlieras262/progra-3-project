import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-grades-est',
  templateUrl: './grades-est.component.html',
  styleUrls: ['./grades-est.component.css']
})
export class GradesEstComponent implements OnInit {

  socket: any;
  loading = true;

  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.getCoursesSocket();
  }

  getCoursesSocket(){
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
