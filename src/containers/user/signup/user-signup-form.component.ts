import { Component, OnDestroy } from '@angular/core';
import {
  XFormComponent,
  XFormInputComponent,
  XFormGroupComponent,
  XFormActionsComponent,
  XFormMessageComponent
} from '../../../components/form';
import { XLabelComponent } from '../../../components/label';
import { XButtonComponent } from '../../../components/button';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { UserActions } from '../../../actions/user';
import { select } from 'ng2-redux';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'qt-user-signup-form',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, XFormComponent, XLabelComponent, XButtonComponent,
    XFormInputComponent, XFormGroupComponent, XFormActionsComponent, XFormMessageComponent],
  template: require('./user-signup-form.component.html'),
})
export class QtUserSignupFormComponent implements OnDestroy {
  @select(state => state.user.getIn(['signupForm', 'errorCode'])) private errorCode$;

  private form: ControlGroup;
  private email: Control;
  private password: Control;
  private password_confirm: Control;

  constructor(private builder: FormBuilder,
              private userActions: UserActions) {
    this.email = new Control('', Validators.required);
    this.password = new Control('', Validators.required);
    this.password_confirm = new Control('', Validators.required);

    this.form = this.builder.group({
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.userActions.signup(this.form.value);
    }
  }

  ngOnDestroy() {
    this.errorCode$.unsubscribe();
  }
}