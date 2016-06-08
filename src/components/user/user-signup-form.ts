import { Component, Output, EventEmitter } from '@angular/core';
import { XFormComponent } from '../form/form';
import { XLabelComponent } from '../form/label';
import { XButtonComponent } from '../button/button';
import { XInputComponent } from '../form/input';
import { XFormGroupComponent } from '../form/form-group';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { XFormActionsComponent } from '../form/form-actions';
import { XFormMessageComponent } from '../form/form-message';

@Component({
  selector: 'x-user-signup-form',
  directives: [FORM_DIRECTIVES, XFormComponent, XLabelComponent, XButtonComponent, XInputComponent,
    XFormGroupComponent, XFormActionsComponent, XFormMessageComponent],
  template: `
    <x-form [formModel]="form" (onSubmit)="handleSubmit($event)">
      <x-form-message>Fill in the Register form.</x-form-message>
      <x-form-group>
        <x-label>E-mail</x-label>
        <x-input [formControl]="email" type="email"></x-input>
      </x-form-group>
      <x-form-group>
        <x-label>Password</x-label>
        <x-input [formControl]="password" type="password"></x-input>
      </x-form-group>
      <x-form-group>
        <x-label>Password confirm</x-label>
        <x-input [formControl]="password_confirm" type="password"></x-input>
      </x-form-group>
      <x-form-actions>
        <x-button size="big" preset="positive" type="submit">Create an account</x-button>
      </x-form-actions>
    </x-form>
  `,
})
export class XUserSignupFormComponent {
  @Output() onSubmit = new EventEmitter<Event>();

  private form: ControlGroup;
  private email: Control;
  private password: Control;
  private password_confirm: Control;

  constructor(private builder: FormBuilder) {
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
    this.onSubmit.emit(this.form.value);
  }
}