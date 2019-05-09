import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  checkField(fieldData, idInput) {
    const node = document.getElementById(idInput);
    if (fieldData === undefined || fieldData === ' ' || fieldData === '') {
      node.classList.remove('is-valid');
      node.classList.add('is-invalid');
      return false;
    } else {
      node.classList.remove('is-invalid');
      node.classList.add('is-valid');
      return true;
    }
  }
}
