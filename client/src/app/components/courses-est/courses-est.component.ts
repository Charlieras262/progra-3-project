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
  thereAreCourses = false;

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
      let i = 0;
      const data = JSON.parse(JSON.stringify(res));
      this.studentService.courses = data.course_asigned;
      this.hasCourses(data.course_asigned);
    })
  }

  hasCourses(courses){
    if(courses.length > 0){
      this.thereAreCourses = true;
    } else {
      this.thereAreCourses = false
    }
  }

}
