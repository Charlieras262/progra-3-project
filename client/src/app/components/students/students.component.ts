import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/services/students/student.service';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  inst: string;
  name: string; 
  lastname: string;
  fnac: string;
  cui: string;
  tel: string;
  address: string;

  constructor(public translate: TranslateService,
    public studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().
      subscribe(res => {
        this.studentService.students = res;
      });
  }

  createStudent(form: NgForm){
    const validations = {inst: {msg: '', success: false}, name: {msg: '', success: false}, lastname: {msg: '', success: false}, fnac: {msg: '', success: false}, cui: {msg: '', success: false}, tel: {msg: '', success: false}, address: {msg: '', success: false}};
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
      validations.fnac = this.checkField(this.fnac, 'fnac', res);
    });
    this.translate.get('student.cui').subscribe(res => {
      validations.cui = this.checkField(this.cui, 'cui', res);
    });
    this.translate.get('student.tel').subscribe(res => {
      validations.tel = this.checkField(this.tel, 'tel', res);
    });
    this.translate.get('student.address').subscribe(res => {
      validations.address = this.checkField(this.address, 'address', res);
    });
    if(validations.inst.success && validations.name.success && validations.lastname.success && validations.fnac.success && validations.cui.success && validations.tel.success && validations.address.success){
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
      });
    }else{
      this.valField(validations.inst.success, validations.inst.msg, 'inst');
      this.valField(validations.name.success, validations.name.msg, 'name');
      this.valField(validations.lastname.success, validations.lastname.msg, 'lastname');
      this.valField(validations.fnac.success, validations.fnac.msg, 'fnac');
      this.valField(validations.cui.success, validations.cui.msg, 'cui');
      this.valField(validations.tel.success, validations.tel.msg, 'tel');
      this.valField(validations.address.success, validations.address.msg, 'address');
    }
  }

  coursesNames(student) {
    var courses = "";
    for(let i = 0; i < student.course_asigned.length; i++){
      if(i != student.course_asigned.length - 1){
        courses += student.course_asigned[i].name+', ';
      }else{
        courses += student.course_asigned[i].name+'.';
      }
    }
    return courses;
  }

  checkField(fieldData, idInput, fieldname) {
    const node = document.getElementById(idInput);
    if (fieldData === undefined || fieldData === ' ' || fieldData === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return {msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false};
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return {msg: '', success: true};
    }
  }

  valField(val, msg, id){
    if(!val){
      $('#'+id).popover({
        title: 'Error',
        content: msg,
        html: false,
        trigger: 'focus'
      });
      $('#'+id).on('input', () => {
        $('#'+id).popover('hide');
        this.translate.get('student.'+id).subscribe(res => {
          const data = this.checkField($('#'+id).children()[0].value, id, res);
          this.valField(data.success, data.msg, id);
        });
      })
    } else {
      $('#'+id).popover('dispose');
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
    }
  }

  rmActiveClass(idInput){
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }
}
