import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InstitutionsService } from 'src/app/services/institutions/institutions.service';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

declare var $: any;

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})

export class InstitutionsComponent implements OnInit {

  code: string;
  name: string;
  institutionSelected = { _id: '', code: '', name: '' }
  validations = { code: { msg: '', success: false }, name: { msg: '', success: false } };

  constructor(public translate: TranslateService,
    public institutionService: InstitutionsService,
    public authService: AuthenticateService) { }

  ngOnInit() {
    this.getInstitutions();
  }

  createInstitution(form: NgForm) {
    this.translate.get('institution.code').subscribe(res => {
      this.validations.code = this.authService.checkField(this.code, 'code', res);
    });
    this.translate.get('institution.name').subscribe(res => {
      this.validations.name = this.authService.checkField(this.name, 'name', res);
    });

    if (this.validations.code.success && this.validations.name.success) {
      const inst = {
        name: this.name,
        code: this.code
      };
      this.institutionService.createInstitutions(inst).subscribe(res => {
        this.translate.get(res as string).subscribe(str => {
          $.toaster(`${str}`, '<i class="fa fa-check-circle"></i>', 'success');
          this.getInstitutions();
          this.cleanForm(form);
        });
      });
    } else {
      this.translate.get('code').subscribe(res => {
        this.authService.valField(this.validations.code.success, this.validations.code.msg, 'code', res);
      });
      this.translate.get('name').subscribe(res => {
        this.authService.valField(this.validations.name.success, this.validations.name.msg, 'name', res);
      });
    }
  }

  getInstitutions() {
    this.institutionService.getInstitutions().
      subscribe(res => {
        this.institutionService.institutions = res;
      });
  }

  rmActiveClass(idInput) {
    const node = document.getElementById(idInput);
    node.classList.remove('valid');
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.rmActiveClass('name');
      this.rmActiveClass('code');
    }
  }

  selectInstitution(institution) {
    this.institutionSelected = institution;
  }

  deleteInstitution() {
    this.institutionService.deleteInstitutions(this.institutionSelected._id)
      .subscribe(res => {
        this.translate.get(res as string).subscribe(str => {
          $.toaster(str, '<i class="fa fa-check-circle"></i>', 'success');
          this.getInstitutions();
          this.flushSelectedInstitution();
        });
      });
  }

  flushSelectedInstitution() {
    this.institutionSelected = { _id: '', code: '', name: '' };
  }
}
