import { Component, Output, EventEmitter } from '@angular/core';
import {
  XFormComponent,
  XFormInputComponent,
  XFormActionsComponent,
  XFormGroupComponent,
  XLabelComponent,
  XButtonComponent,
  XFormContentComponent,
  XFormErrorComponent,
} from '../../../components';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AsyncPipe, NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'qt-user-signin-form',
  template: require('./user-signin-form.component.html'),
  directives: [ROUTER_DIRECTIVES, NgSwitch, NgSwitchCase, NgSwitchDefault, XFormComponent,
    XLabelComponent, XButtonComponent, XFormInputComponent, XFormGroupComponent, XFormActionsComponent,
    XFormContentComponent, XFormErrorComponent],
  pipes: [AsyncPipe],
})
export class QtUserSigninFormComponent {
  @Output() private onSubmit = new EventEmitter();

  private form: FormGroup;
  private email: FormControl;
  private password: FormControl;
  private isSubmitted: boolean;

  constructor(private builder: FormBuilder) {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.form = this.builder.group({
      email: this.email,
      password: this.password,
    });
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
