import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/users';
  authToken: any;
  user: any;

  constructor(public http: HttpClient) { }

  authUserCredentials(user, flag) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    switch (flag) {
      case 'l':
        return this.http.post(this.API_URL + '/authenticate/login', user, { headers: headers });
      case 'r':
        return this.http.post(this.API_URL + '/authenticate/register', user, { headers: headers });
      default:
        break;
    }
  }

  checkField(fieldData, idInput) {
    const node = document.getElementById(idInput);
    if (fieldData === undefined || fieldData === ' ' || fieldData === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return false;
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return true;
    }
  }

  valEmailFormat(email) {
    const emailNode = document.getElementById('email');
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === undefined || email === ' ' || email === '') {
      emailNode.classList.remove('valid');
      emailNode.classList.add('invalid');
      return false;
    } else {
      if (!re.test(email)) {
        emailNode.classList.remove('valid');
        emailNode.classList.add('invalid');
        return false;
      } else {
        emailNode.classList.remove('invalid');
        emailNode.classList.add('valid');
        return true;
      }
    }
  }

  checkIfField(valid, id) {
    const node = document.getElementById(id);
    if (!valid) {
      node.classList.remove('valid');
      node.classList.add('invalid');
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
    }
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = user;
  }

  loggedIn() {
    return !jwtHelper.isTokenExpired(localStorage.getItem('id_token'));
  }
}
