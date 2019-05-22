import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teacherSelected = { _id: '', name: '', lastName: '', fnac: '', cui: '', esp: '' }
  validations = { name: { msg: '', success: false }, lastname: { msg: '', success: false }, fnac: { msg: '', success: false }, cui: { msg: '', success: false }, esp: { msg: '', success: false } }
  _id: string;
  name: string;
  lastname: string;
  fnac: string;
  cui: string;
  esp: string;

  constructor(public teacherService: TeacherService,
    public authService: AuthenticateService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getTeachers().
      subscribe(res => {
        this.teacherService.teachers = res;
      });
  }

  createTeacher(form: NgForm) {
    this.translate.get('teacher.name').subscribe(res => {
      this.validations.name = this.authService.checkField(this.name, 'name', res);
    });
    this.translate.get('teacher.lastname').subscribe(res => {
      this.validations.lastname = this.authService.checkField(this.lastname, 'lastname', res);
    });
    this.translate.get('teacher.fnac').subscribe(res => {
      this.validations.fnac = this.authService.checkField(this.fnac, 'fnac', res);
    });
    this.translate.get('teacher.cui').subscribe(res => {
      this.validations.cui = this.authService.checkField(this.cui, 'cui', res);
    });
    this.translate.get('teacher.esp').subscribe(res => {
      this.validations.esp = this.authService.checkField(this.esp, 'esp', res);
    });
    if (this.validations.name.success && this.validations.lastname.success && this.validations.fnac.success && this.validations.cui.success && this.validations.esp.success) {
      const teacher = { name: this.name, lastName: this.lastname, fnac: this.fnac, cui: this.cui, esp: this.esp };
      this.teacherService.postTeacher(teacher).subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        if (data.success) {
          this.translate.get(data.msg).subscribe(str => {
            $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
            this.cleanForm(form);
            this.getTeachers();
          });
        } else {
          this.translate.get(data.msg).subscribe(str => {
            $.toaster(`${str}`, '<i class="fa fa-times"></i>', 'danger');
          });
        }
      });
    } else {
      this.translate.get('teacher.name').subscribe(res => {
        this.authService.valField(this.validations.name.success, this.validations.name.msg, 'name', res);
      });
      this.translate.get('teacher.lastname').subscribe(res => {
        this.authService.valField(this.validations.lastname.success, this.validations.lastname.msg, 'lastname', res);
      });
      this.translate.get('teacher.fnac').subscribe(res => {
        this.authService.valField(this.validations.fnac.success, this.validations.fnac.msg, 'fnac', res);
      });
      this.translate.get('teacher.cui').subscribe(res => {
        this.authService.valField(this.validations.cui.success, this.validations.cui.msg, 'cui', res);
      });
      this.translate.get('teacher.esp').subscribe(res => {
        this.authService.valField(this.validations.esp.success, this.validations.esp.msg, 'esp', res);
      });
    }
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.rmActiveClass('name');
      this.rmActiveClass('lastname');
      this.rmActiveClass('fnac');
      this.rmActiveClass('cui');
      this.rmActiveClass('esp');
    }
  }

  rmActiveClass(idInput) {
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }

  flushSelectedTeacher() {
    this.teacherSelected = { _id: '', name: '', lastName: '', fnac: '', cui: '', esp: '' }
  }

  selectTeacher(teacher) {
    this.teacherSelected = teacher;
  }

  deleteTeacher() {
    this.teacherService.deleteTeacher(this.teacherSelected._id)
      .subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        this.translate.get(data.msg).subscribe(res => {
          $.toaster(res, '<i class="fa fa-check-circle"></i>', 'success');
          this.getTeachers();
          this.flushSelectedTeacher();
        });
      });
  }
}
