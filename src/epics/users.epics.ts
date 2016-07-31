import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { UsersActions } from '../actions';
import { Observable } from 'rxjs';
import { UsersService } from '../services';

@Injectable()
export class UsersEpics {
  constructor(private usersService: UsersService) {
  }

  fetchUsers = (action$: ActionsObservable) => {
    return action$.ofType(UsersActions.USERS_FETCH)
      .flatMap(({payload}) => {
        return this.usersService.fetchAll(payload.filter)
          .map(result => ({
            type: UsersActions.USERS_FETCH_SUCCESS,
            payload: result,
          }))
          .catch(error => Observable.of({
            type: UsersActions.USERS_FETCH_ERROR,
            payload: { errorCode: error.status },
          }));
      });
  };

  followUser = (action$: ActionsObservable) => {
    return action$.ofType(UsersActions.USERS_FOLLOW)
      .flatMap(({payload}) => {
        return this.usersService.follow(payload.user)
          .map(result => ({
            type: UsersActions.USERS_FOLLOW_SUCCESS,
            payload: result,
          }))
          .catch(error => Observable.of({
            type: UsersActions.USERS_FOLLOW_ERROR,
            payload: { errorCode: error.status },
          }));
      });
  };

  unfollowUser = (action$: ActionsObservable) => {
    return action$.ofType(UsersActions.USERS_UNFOLLOW)
      .flatMap(({payload}) => {
        return this.usersService.unfollow(payload.user)
          .map(result => ({
            type: UsersActions.USERS_UNFOLLOW_SUCCESS,
            payload: result,
          }))
          .catch(error => Observable.of({
            type: UsersActions.USERS_UNFOLLOW_ERROR,
            payload: { errorCode: error.status },
          }));
      });
  };
}
