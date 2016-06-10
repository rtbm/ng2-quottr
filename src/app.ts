require('./app.less');

import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import rootReducer, { IAppState } from './reducers';
import { middlewares } from './state/middlewares';
import { enhancers } from './state/enhancers';
import { XHomePageComponent } from './containers/home';
import { XUserPageComponent } from './containers/user';
import { XAccountPageComponent } from './containers/account';

@Component({
  selector: 'x-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [require('./app.less')],
  encapsulation: ViewEncapsulation.None,
})

@Routes([{
  path: '/',
  component: XHomePageComponent,
}, {
  path: '/account',
  component: XAccountPageComponent,
}, {
  path: '/user',
  component: XUserPageComponent,
}])

export class XApp {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) {
    ngRedux.configureStore(rootReducer, {}, middlewares, enhancers);
  }
}
