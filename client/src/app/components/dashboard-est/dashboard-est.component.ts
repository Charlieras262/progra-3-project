import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';

@Component({
  selector: 'app-dashboard-est',
  templateUrl: './dashboard-est.component.html',
  styleUrls: ['./dashboard-est.component.css']
})
export class DashboardEstComponent implements OnInit {

  id: any;
  constructor(public studentService: StudentService) { }

  ngOnInit() {
    const user = this.studentService.loadUser();
    this.id = user.code;
  }

}
