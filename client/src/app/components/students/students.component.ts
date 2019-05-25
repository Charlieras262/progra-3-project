import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/services/students/student.service';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { NgForm } from '@angular/forms';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';

declare var $: any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  socket: any;
  inst: string;
  name: string;
  lastname: string;
  fnac: string;
  cui: string;
  tel: string;
  address: string;
  studentSelected = { _id: '', name: '', lastName: '', fnac: '', cui: '', tel: '', val_code: '' };

  constructor(public translate: TranslateService,
    public studentService: StudentService,
    public instService: InstitutionsService) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.getStudents();
    this.getInstitutions();
    this.selectInst();
  }

  getStudents() {
    this.studentService.getStudents().
      subscribe(res => {
        this.studentService.students = res;
      });
  }

  getInstitutions() {
    this.instService.getInstitutions().
      subscribe(res => {
        this.instService.institutions = res;
      });
  }

  createStudent(form: NgForm) {
    console.log(this.inst);
    const validations = { inst: { msg: '', success: false }, name: { msg: '', success: false }, lastname: { msg: '', success: false }, fnac: { msg: '', success: false }, cui: { msg: '', success: false }, tel: { msg: '', success: false }, address: { msg: '', success: false } };
    this.translate.get('student.inst').subscribe(res => {
      validations.inst = this.checkField(this.inst, 'inst', res);
    });
    this.translate.get('student.name').subscribe(res => {
      validations.name = this.checkField(this.name, 'name', res);
    });
    this.translate.get('student.lastname').subscribe(res => {
      validations.lastname = this.checkField(this.lastname, 'lastname', res);
    });
    this.translate.get('student.fnac').subscribe(res => {
      validations.fnac = this.checkDateField(this.fnac, 'fnac', res);
    });
    this.translate.get('student.cui').subscribe(res => {
      validations.cui = this.checkDpiField(this.cui, 'cui', res);
    });
    this.translate.get('student.tel').subscribe(res => {
      validations.tel = this.checkTelField(this.tel, 'tel', res);
    });
    this.translate.get('student.address').subscribe(res => {
      validations.address = this.checkField(this.address, 'address', res);
    });
    if (validations.inst.success && validations.name.success && validations.lastname.success && validations.fnac.success && validations.cui.success && validations.tel.success && validations.address.success) {
      this.studentService.postStudent({
        inst_code: this.inst,
        name: this.name,
        lastName: this.lastname,
        fnac: this.fnac,
        cui: this.cui,
        tel: this.tel,
        address: this.address
      }).subscribe(res => {
        this.translate.get(res as string).subscribe(str => {
          $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
        });
        this.getStudents();
        this.cleanForm(form);
        this.socket.emit('updateHome');
      });
    } else {
      this.translate.get('inst').subscribe(res => {
        this.valField(validations.inst.success, this.translate.instant('student.valInst'), 'inst', res);
      });
      this.translate.get('name').subscribe(res => {
        this.valField(validations.name.success, validations.name.msg, 'name', res);
      });
      this.translate.get('lastname').subscribe(res => {
        this.valField(validations.lastname.success, validations.lastname.msg, 'lastname', res);
      });
      this.translate.get('fnac').subscribe(res => {
        this.valField(validations.fnac.success, validations.fnac.msg, 'fnac', res);
      });
      this.translate.get('cui').subscribe(res => {
        this.valField(validations.cui.success, validations.cui.msg, 'cui', res);
      });
      this.translate.get('tel').subscribe(res => {
        this.valField(validations.tel.success, validations.tel.msg, 'tel', res);
      });
      this.translate.get('address').subscribe(res => {
        this.valField(validations.address.success, validations.address.msg, 'address', res);
      });
    }
  }

  coursesNames(student) {
    var courses = "";
    for (let i = 0; i < student.course_asigned.length; i++) {
      if (i != student.course_asigned.length - 1) {
        courses += student.course_asigned[i].name + ', ';
      } else {
        courses += student.course_asigned[i].name + '.';
      }
    }
    return courses;
  }

  checkField(fieldData, idInput, fieldname) {
    const node = document.getElementById(idInput);
    if (fieldData === undefined || fieldData === ' ' || fieldData === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  valField(val, msg, id, fieldname) {
    if (!val) {
      $('#' + id).popover({
        title: 'Error',
        content: msg,
        html: false,
        trigger: 'focus'
      });
      $('#' + id).on('input', () => {
        $('#' + id).popover('hide');
        let data;
        switch (id) {
          case 'fnac':
            data = this.checkDateField($('#' + id).children()[0].value, id, fieldname);
            break;
          case 'tel':
            data = this.checkTelField($('#' + id).children()[0].value, id, fieldname);
            break;
          case 'cui':
            data = this.checkDpiField($('#' + id).children()[0].value, id, fieldname);
            break;
          default:
            data = this.checkField($('#' + id).children()[0].value, id, fieldname);
            break;
        }
        this.valField(data.success, data.msg, id, fieldname);
      })
    } else {
      $('#' + id).popover('dispose');
    }
  }


  checkDpiField(field, id, fieldname) {
    const node = document.getElementById(id);
    if (field === undefined || field === ' ' || field === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false };
    } else if (field.length < 13) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('student.valDpiLess'), success: false };
    } else if (field.length > 13) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('student.valDpiMore'), success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  checkTelField(field, id, fieldname) {
    const node = document.getElementById(id);
    if (field === undefined || field === ' ' || field === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false };
    } else if (field.length < 8) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('student.valTelLess'), success: false };
    } else if (field.length > 8) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('student.valTelMore'), success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  checkDateField(field, id, fieldname) {
    const node = document.getElementById(id);
    const rex = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    if (field === undefined || field === ' ' || field === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false };
    } else if (!rex.test(field)) {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return { msg: this.translate.instant('student.valDate'), success: false };
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return { msg: '', success: true };
    }
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.rmActiveClass('inst');
      this.rmActiveClass('name');
      this.rmActiveClass('lastname');
      this.rmActiveClass('fnac');
      this.rmActiveClass('cui');
      this.rmActiveClass('tel');
      this.rmActiveClass('address');
      $('#instSelect option:first').prop('selected',true);
    }
  }

  rmActiveClass(idInput) {
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }

  selectStudent(student) {
    this.studentSelected = student;
  }

  selectInst() {
    $("#instSelect").change(() => {
      this.inst = $('#instSelect').val();
    });
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.studentSelected._id)
      .subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        this.translate.get(data.msg).subscribe(res => {
          $.toaster(res, '<i class="fa fa-check-circle"></i>', 'success');
          this.getStudents();
          this.flushSelectedStudent();
        });
      });
  }

  flushSelectedStudent() {
    this.studentSelected = { _id: '', name: '', lastName: '', fnac: '', cui: '', tel: '', val_code: '' };
  }
}
