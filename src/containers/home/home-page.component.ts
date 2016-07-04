import { Component } from '@angular/core';
import { XBannerComponent } from '../../components';
import { QtHeaderComponent } from '../header';

@Component({
  selector: 'qt-home-page',
  template: require('./home-page.component.html'),
  directives: [XBannerComponent, QtHeaderComponent],
})
export class QtHomePageComponent {
}
