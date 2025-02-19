import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const GlobalActions = createActionGroup({
  source: 'Global Actions',
  events: {
    'Submit Log In': props<{email: string; password: string}>(),
    'Log In Success': props<{token: string}>(),
    'Log In Failure': emptyProps(),
    'Load token from LocalStorage': props<{token: string}>(),
    'Set Auth Token': props<{token: string}>(),
    'Route To Home': emptyProps(),
    'Route To Login': emptyProps(),
  },
});
