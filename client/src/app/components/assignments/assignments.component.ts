import { Component, OnInit } from '@angular/core';
import { AssignService } from 'src/app/services/assign/assign.service';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/services/students/student.service';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';

declare var $: any;

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  socket: any;
  assignSelected = {_id: '', carne_stud: '' ,cod_course: '' , section: '' }
  validations = {carnet: {msg: '', success: false}, code: {msg: '', success: false}, section: {msg: '', success: false}}
  _id: string;
  carnet: string;
  code: string;
  section: string;

  constructor(public assignService: AssignService,
    public authService: AuthenticateService,
    public translate: TranslateService,
    public studentService: StudentService,
    public coursesService: CoursesService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.getAssigns();
    this.getStudents();
    this.getCourses();
    this.selectCode();
    this.selectCarnet();
  }

  getStudents() {
    this.studentService.getStudents().
      subscribe(students => {
        this.studentService.students = students;
      });
  }

  getCourses() {
    this.coursesService.getCourses().
      subscribe(courses => {
        this.coursesService.courses = courses;
      });
  }

  getAssigns(){
    this.assignService.getAssign().subscribe(res => {
      this.assignService.assigns = res;
    });
  }

  createAssign(form: NgForm){
    this.translate.get('assign.carnet').subscribe(res => {
      this.validations.carnet = this.authService.checkField(this.carnet, 'carnet', res);
    });
    this.translate.get('assign.code').subscribe(res => {
      this.validations.code = this.authService.checkField(this.code, 'code', res);
    });
    this.translate.get('assign.section').subscribe(res => {
      this.validations.section = this.authService.checkField(this.section, 'section', res);
    });
    if(this.validations.carnet.success && this.validations.code.success && this.validations.section.success){
      this.assignService.createAssign({carne_stud: this.carnet, cod_course: this.code, section: this.section}).subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        if(data.success){
          this.translate.get(data.msg).subscribe(str => {
            $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
            this.socket.emit('getCourse');
            this.cleanForm(form);
            this.getAssigns();
          });
        } else {
          if(data.node){
            this.translate.get('assign.'+data.node).subscribe(res => {
              this.authService.valFieldShow(data.success, this.translate.instant(data.msg), data.node, res);
            });
          } else{
            this.translate.get(data.msg).subscribe(str => {
              $.toaster(`${str}`, '<i class="fa fa-times"></i>', 'danger');
            });
          }
        }
      });
    } else {
      this.translate.get('assign.carnet').subscribe(res => {
        this.authService.valField(this.validations.carnet.success, this.validations.carnet.msg, 'carnet', res);
      });
      this.translate.get('assign.code').subscribe(res => {
        this.authService.valField(this.validations.code.success, this.validations.code.msg, 'code', res);
      });
      this.translate.get('assign.section').subscribe(res => {
        this.authService.valField(this.validations.section.success, this.validations.section.msg, 'section', res);
      });
    }
  }

  selectCarnet() {
    $("#carnetSelect").change(() => {
      this.carnet = $('#carnetSelect').val();
    });
  }

  selectCode() {
    $("#codeSelect").change(() => {
      this.code = $('#codeSelect').val();
    });
  }

  rmActiveClass(idInput) {
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.rmActiveClass('carnet');
      this.rmActiveClass('code');
      this.rmActiveClass('section');
      this.flushSelectedAssign();
      $('#carnetSelect option:first').prop('selected',true);
      $('#codeSelect option:first').prop('selected',true);
    }
  }

  selectAssign(assign) {
    this.assignSelected = assign;
  }

  deleteAssign() {
    this.assignService.deleteAssign(this.assignSelected._id)
      .subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        this.translate.get(data.msg).subscribe(str => {
          $.toaster(str, '<i class="fa fa-check-circle"></i>', 'success');
          this.socket.emit('getCourse');
          this.getAssigns();
          this.flushSelectedAssign();
        });
      });
  }

  flushSelectedAssign() {
    this.assignSelected = {_id: '', carne_stud: '' ,cod_course: '' , section: '' };
  }
}