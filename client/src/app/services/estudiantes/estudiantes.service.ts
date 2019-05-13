import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { AuthenticateService } from '../authenticate/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/students';
  authToken: any;
  user: any;

  constructor(public http: HttpClient,
    public authService: AuthenticateService) { }

  getStudentsAmount() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.API_URL}/amount`, { headers: headers });
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
