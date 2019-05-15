import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { AuthenticateService } from '../authenticate/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/students';
  authToken: any;
  user: any;
  students: any;

  constructor(public http: HttpClient,
    public authService: AuthenticateService) { }

  getStudentsAmount() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.API_URL}/amount`, { headers: headers });
  }

  getStudents(){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL, { headers: headers });
  }

  postStudent(student) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post(this.API_URL, student, { headers: headers });
  }

  putStudent(student) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.put(this.API_URL + `/${student._id}`, student, { headers: headers });
  }

  deleteStudent(_id: string) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete(this.API_URL + `/${_id}`, { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = user;
  }

}
