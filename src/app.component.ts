import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import rootReducer, { IAppState } from './reducers';
import { createEpicMiddleware } from 'redux-observable';
import { middlewares } from './state';
import { NgRedux } from 'ng2-redux';
import { UserEpics, CirclesEpics, ProfileEpics, QuotesEpics, UsersEpics } from './epics';
import { enhancers } from './state/enhancers';

@Component({
  selector: 'qt-app',
  directives: [ROUTER_DIRECTIVES],
  template: `<router-outlet></router-outlet>`,
  styles: [require('./app.component.less')],
  encapsulation: ViewEncapsulation.None,
})

export class QtAppComponent {
  constructor(private ngRedux: NgRedux<IAppState>,
              private router: Router,
              private userEpics: UserEpics,
              private circlesEpics: CirclesEpics,
              private profileEpics: ProfileEpics,
              private quotesEpics: QuotesEpics,
              private usersEpics: UsersEpics) {

    middlewares.push(
      createEpicMiddleware(this.userEpics.signin),
      createEpicMiddleware(this.userEpics.signup),
      createEpicMiddleware(this.userEpics.resetPassword),
      createEpicMiddleware(this.userEpics.changePassword),
      createEpicMiddleware(this.circlesEpics.fetchCircles),
      createEpicMiddleware(this.circlesEpics.saveCircle),
      createEpicMiddleware(this.circlesEpics.updateCircleModal),
      createEpicMiddleware(this.circlesEpics.updateCircle),
      createEpicMiddleware(this.circlesEpics.removeCircle),
      createEpicMiddleware(this.profileEpics.fetchUser),
      createEpicMiddleware(this.profileEpics.updateUser),
      createEpicMiddleware(this.quotesEpics.fetchQuotes),
      createEpicMiddleware(this.quotesEpics.saveQuote),
      createEpicMiddleware(this.quotesEpics.updateQuoteModal),
      createEpicMiddleware(this.quotesEpics.updateQuote),
      createEpicMiddleware(this.quotesEpics.removeQuote),
      createEpicMiddleware(this.usersEpics.fetchUsers),
      createEpicMiddleware(this.usersEpics.inviteUser),
      createEpicMiddleware(this.usersEpics.followUser)
    );

    ngRedux.configureStore(rootReducer, {}, middlewares, enhancers);
  }
}
