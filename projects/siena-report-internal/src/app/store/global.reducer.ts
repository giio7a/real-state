import {createReducer, on} from '@ngrx/store';
import {GlobalActions} from './global.actions';
import {initialState} from './global.state';

export const globalReducer = createReducer(
  initialState,
  on(GlobalActions.setAuthToken, (state, {token}) => {
    return {
      ...state,
      authToken: token,
    };
  }),
);
