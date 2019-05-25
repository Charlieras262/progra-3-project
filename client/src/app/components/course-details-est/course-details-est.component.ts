import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-course-details-est',
  templateUrl: './course-details-est.component.html',
  styleUrls: ['./course-details-est.component.css']
})
export class CourseDetailsEstComponent implements OnInit {

  id: any;
  course = {
    _id: '', 
    name:'', 
    cod_inst: '', 
    cod_teacher: {
      _id: '', 
      name: '', 
      lastName: ''
    }, 
    cod_course: '', 
    pensum: {
      name: '', 
      unities: []
    },
    score:{
      fe: '',
      p1: '',
      p2: '',
      z: ''
    }
  };

  constructor(public rutaActiva: ActivatedRoute,
    public coursesService: CoursesService) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id
    this.getCourse(this.id);
  }

  getCourse(id){
    this.coursesService.getCourse(id).subscribe(res => {
      this.course = res as {_id: '', name:'', cod_inst: '', cod_teacher: {_id: '', name: '', lastName: ''}, cod_course: '', pensum: {name: '', unities: []},score:{fe: '',p1: '',p2: '',z: ''}};
      console.log(this.course);
    });
  }
}
