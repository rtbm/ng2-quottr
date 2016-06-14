import { Component, EventEmitter, Output } from '@angular/core';
import { ControlGroup, Control, FormBuilder, Validators } from '@angular/common';
import {
  XFormComponent,
  XFormTextareaComponent,
  XFormActionsComponent,
  XFormInputComponent,
  XFormGroupComponent
} from '../../components/form';
import { XButtonComponent } from '../../components/button';

@Component({
  selector: 'qt-dashboard-quote-form',
  directives: [XFormComponent, XFormGroupComponent, XFormTextareaComponent, XFormActionsComponent,
    XButtonComponent, XFormInputComponent],
  template: require('./dashboard-quote-form.html'),
  styles: [require('./dashboard-quote-form.less')],
})
export class QtDashboardQuoteFormComponent {
  @Output() private onSubmit = new EventEmitter();

  private form: ControlGroup;
  private name: Control;
  private content: Control;
  private url: Control;

  constructor(private builder: FormBuilder) {
    this.name = new Control('', Validators.required);
    this.content = new Control('', Validators.required);
    this.url = new Control('', Validators.required);

    this.form = this.builder.group({
      name: this.name,
      content: this.content,
      url: this.url,
    });
  }

  handleSubmit() {
    if (this.form.status !== 'VALID') return false;
    this.onSubmit.emit(this.form.value);
  }
}
