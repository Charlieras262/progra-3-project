import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
readonly API_URL = ProjectVariable.serverLocation + 'api/students';
  constructor(public http: HttpClient) {}
  
  obtenerUsuario(){
 let headers = new HttpHeaders().set('Content-Type', 'application/json');
 return this.http.get(this.API_URL,  { headers: headers });
 
  }
}
