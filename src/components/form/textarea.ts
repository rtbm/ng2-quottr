import { Input, Component } from '@angular/core';
import { NgFormControl } from '@angular/common';

@Component({
  selector: 'x-textarea',
  template: `
    <textarea [ngFormControl]="formControl"
              [attr.placeholder]="placeholder"></textarea>
  `,
  styles: [`
    textarea {
      border: .1rem solid #d9d9d9;
      padding: 1rem;
      outline: 0;
      width: 100%;
      box-sizing: border-box;
      min-height: 30rem;
    }
    textarea:focus {
      border: .1rem solid #111;
    }
  `],
})
export class XTextareaComponent {
  @Input() placeholder: string = '';
  @Input() formControl: NgFormControl;
}
