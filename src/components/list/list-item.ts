import { Component } from '@angular/core';

@Component({
  selector: 'x-list-item',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      padding: 1rem 0;
    }
  `]
})
export class XListItemComponent {
}