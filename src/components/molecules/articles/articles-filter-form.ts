import { Component, Output, EventEmitter } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Control } from '@angular/common';
import { XFormComponent } from '../../atoms/form/form';
import { XFormGroupComponent } from '../../atoms/form/form-group';
import { XLabelComponent } from '../../atoms/form/label';
import { XInputComponent } from '../../atoms/form/input';
import { XButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'x-articles-filter-form',
  directives: [FORM_DIRECTIVES, XFormComponent, XLabelComponent, XInputComponent, XButtonComponent,
    XFormGroupComponent],
  template: `
    <x-form [formModel]="form">     
      <x-label>Filter</x-label>
      <x-input [formControl]="phrase" type="text" (onKeyUp)="handleKeyUp()"></x-input>
    </x-form>
  `,
})
export class XArticlesFilterFormComponent {
  @Output() private onKeyUp = new EventEmitter();

  private form: ControlGroup;
  private phrase: Control;

  constructor(private builder: FormBuilder) {
    this.phrase = new Control('');

    this.form = this.builder.group({
      phrase: this.phrase,
    });
  }

  handleKeyUp() {
    this.onKeyUp.emit(this.form.value);
  }
}