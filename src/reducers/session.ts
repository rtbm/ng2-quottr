import { SessionActions } from '../actions/session';
import { Map, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
    isPending: false,
    isError: false,
    isLogged: false,
    token: '',
});

export type ISession = Map<string, any>;

export function sessionReducer(state: ISession = INITIAL_STATE, action: any = { type: ''}) {
    switch(action.type) {
        case SessionActions.SIGNIN_USER_PENDING: {
            return state.merge({ isPending: true, isError: false });
        }
        case SessionActions.SIGNIN_USER_SUCCESS: {
            return state.merge({ isPending: false, isLogged: true, token: action.payload.token });
        }
        case SessionActions.SIGNIN_USER_ERROR: {
            return state.merge({ isPending: false, isError: true });
        }
        case SessionActions.SIGNUP_USER_PENDING: {
            return state.merge({ isPending: true, isError: false });
        }
        case SessionActions.SIGNUP_USER_SUCCESS: {
            return state.merge({ isPending: false, isLogged: true, token: action.payload.token });
        }
        case SessionActions.SIGNUP_USER_ERROR: {
            return state.merge({ isPending: false, isError: true });
        }
        case SessionActions.LOGOUT_USER: {
            return state.merge(INITIAL_STATE);
        }
        default: {
            return state;
        }
    }
}
