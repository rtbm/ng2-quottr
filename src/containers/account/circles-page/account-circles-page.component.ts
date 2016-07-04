import { Component, OnDestroy } from '@angular/core';
import { XWrapperComponent } from '../../../components';
import { CirclesActions } from '../../../actions/circles';
import { select } from 'ng2-redux';
import { XButtonComponent } from '../../../components';

@Component({
  selector: 'qt-account-circles-page',
  template: require('./account-circles-page.component.html'),
  styles: [require('./account-circles-page.component.less')],
  directives: [XWrapperComponent, XButtonComponent],
})
export class QtAccountCirclesPageComponent implements OnDestroy {
  @select(state => state.circles.getIn(['circles', 'items'])) private circles$;

  private items = [];

  constructor(private circlesActions: CirclesActions) {
    this.circlesActions.fetchCircles();

    this.circles$.subscribe((items: any) => {
      this.items = items.toJS();
    });
  }

  ngOnDestroy() {
    this.circles$.unsubscribe();
  }
}
