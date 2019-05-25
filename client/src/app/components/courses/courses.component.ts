import { Component, OnInit, Directive, Input } from '@angular/core';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  socket: any
  n = 2;
  unities = [
    {
      number: 1,
      subjects: [
        {
          name: '',
          contentHelp: ''
        }
      ]
    }
  ];
  name: string;
  inst: string;
  prof: string;
  validations = {name: {msg: '', success: false}, inst: {msg: '', success: false}, prof: {msg: '', success: false}, unities: false}

  constructor(public institutionService: InstitutionsService,
    public teacherService: TeacherService,
    public translate: TranslateService,
    public authService: AuthenticateService,
    public courseService: CoursesService,
    public router: Router) { }

  ngOnInit() {
    this.socket = io(ProjectVariable.serverLocation);
    this.getInstitutions();
    this.getTeachers();
    this.selectInst();
    this.selectProf();
  }

  getInstitutions() {
    this.institutionService.getInstitutions().
      subscribe(res => {
        this.institutionService.institutions = res;
      });
  }

  getTeachers() {
    this.teacherService.getTeachers().
      subscribe(res => {
        this.teacherService.teachers = res;
      });
  }

  createAssign(form: NgForm) {
    this.translate.get('courses.name').subscribe(res => {
      this.validations.name = this.authService.checkField(this.name, 'name', res);
    });
    this.translate.get('courses.inst').subscribe(res => {
      this.validations.inst = this.authService.checkField(this.inst, 'inst', res);
    });
    this.translate.get('courses.prof').subscribe(res => {
      this.validations.prof = this.authService.checkField(this.prof, 'prof', res);
    });
    this.valUnitiesAndContents();
    if(this.validations.name.success && this.validations.prof.success && this.validations.inst.success && this.validations.unities){
      const course = {
          inst: this.inst,
          prof: this.prof,
          name: this.name,
          pensum: {
            name: this.name,
            unities: this.unities
          }
      }
      this.courseService.createCourse(course).subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        if(data.success){
          this.translate.get(data.msg).subscribe(str => {
            $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
          });
        } else {
          this.translate.get('error').subscribe(str => {
            $.toaster(`${str}`, '<i class="fa fa-times"></i>', 'danger');
          });
        }
        this.socket.emit('updateHome');
        const user = this.authService.loadUser();
        if(user.type === 'A'){
          this.router.navigate(['/dashboard/0010']);
        } else if (user.type === 'S'){
          this.router.navigate(['/dashboard/0001']);
        } else {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.translate.get('courses.name').subscribe(res => {
        this.authService.valField(this.validations.name.success, this.validations.name.msg, 'name', res);
      });
      this.translate.get('courses.inst').subscribe(res => {
        this.authService.valField(this.validations.inst.success, this.validations.inst.msg, 'inst', res);
      });
      this.translate.get('courses.prof').subscribe(res => {
        this.authService.valField(this.validations.prof.success, this.validations.prof.msg, 'prof', res);
      }); 
    }
  }

  valUnitiesAndContents(){
    this.unities.forEach(unity => {
      unity.subjects.forEach(subject => {
        const val = {title: {msg: '', success: false}, help: {msg: '', success: false}}
        const idTitle = 'title'+(this.unities.indexOf(unity)+1)+''+(unity.subjects.indexOf(subject)+1);
        const idHelp = 'help'+(this.unities.indexOf(unity)+1)+''+(unity.subjects.indexOf(subject)+1);
        this.translate.get('courses.contentTitle').subscribe(res => {
          val.title = this.authService.checkField(subject.name, idTitle, res);
        });
        this.translate.get('courses.contentHelp').subscribe(res => {
          val.help = this.authService.checkField(subject.contentHelp, idHelp, res);
        });
        if(val.title.success && val.help.success){
          this.validations.unities = true;
        } else {
          this.translate.get('courses.contentTitle').subscribe(res => {
            this.authService.valField(val.title.success, val.title.msg, idTitle, res);
          })
          this.translate.get('courses.contentHelp').subscribe(res => {
            this.authService.valField(val.help.success, val.help.msg, idHelp, res);
          });
          this.validations.unities = false;
        }
      });
    });
  }

  addContent(number) {
    const strCH = this.translate.instant('courses.contentHelp');
    const strName = this.translate.instant('courses.contentTitle')
    this.unities[number - 1].subjects.push({
      name: '',
      contentHelp: ''
    })
    const idTitle = 'title' +number+''+(this.unities[number - 1].subjects.length);
    const idHelp = 'help' +number+''+(this.unities[number - 1].subjects.length);
    const contentTemple = '<div class="wrap-input-inline"> '
    + '<div id="' + idTitle + '" class="form-group wrap-input"> '
    + '<input type="name" name="title" class="form-control input" '
    + 'placeholder="' + strName + '"> '
    + '<span class="focus-input"></span> '
    + '<span class="symbol-input"> '
    + '<i class="fa fa-book" aria-hidden="true"></i> '
    + '</span> '
    + '<span class="input-valid"> '
    + '<i class="fa fa-check" aria-hidden="true"></i> '
    + '</span> '
    + '<span class="input-invalid shake"> '
    + '<i class="fa fa-times" aria-hidden="true"></i> '
    + '</span> '
    + '</div> '
    + '<div id="' + idHelp + '" class="form-group wrap-input"> '
    + '<input type="name" name="help" class="form-control input" '
    + 'placeholder="' + strCH + '"> '
    + '<span class="focus-input"></span> '
    + '<span class="symbol-input"> '
    + '<i class="fa fa-at" aria-hidden="true"></i> '
    + '</span> '
    + '<span class="input-valid"> '
    + '<i class="fa fa-check" aria-hidden="true"></i> '
    + '</span> '
    + '<span class="input-invalid shake"> '
    + '<i class="fa fa-times" aria-hidden="true"></i> '
    + '</span> '
    + '</div> '
    + '</div> '
    const contents = document.getElementById(`unity${number}`).children[1];
    var node = document.createElement('div')
    node.id = 'content' + (this.unities[number - 1].subjects.length);
    node.innerHTML = contentTemple;
    contents.appendChild(node)
    this.addInputListener(idTitle, number - 1, this.unities[(number - 1)].subjects.length - 1, 1)
    this.addInputListener(idHelp, number - 1, this.unities[(number - 1)].subjects.length - 1, 2)
  }

  addInputListener(id, unityPos, subjectsPos, op) {
    const node = document.getElementById(id).children[0];
    node.addEventListener('input', (e) => {
      if (op === 1) {
        this.unities[unityPos].subjects[subjectsPos].name = $('#' + id)[0].children[0].value;
      } else {
        this.unities[unityPos].subjects[subjectsPos].contentHelp = $('#' + id)[0].children[0].value;
      }
    })
  }

  addUnity() {
    this.unities.push({
      number: this.n++,
      subjects: []
    });
    
    const unities = $('#unities');
    var t = ((jQuery)($('#unityTemplate')[0].children[0]));
    var clone = t.clone();
    ((jQuery)(clone[0].children[3])).on('click', () => {
      this.addContent(clone[0].children[2].value as number)
    });
    unities.append(clone);
    this.addContent(clone[0].children[2].value as number)
  }

  selectInst() {
    $("#codeInstSelect").change(() => {
      this.inst = $('#codeInstSelect').val();
    });
  }

  selectProf() {
    $("#codeProfSelect").change(() => {
      this.prof = $('#codeProfSelect').val();
    });
  }

  cleanForm(){
    window.location.reload();
  }
}
