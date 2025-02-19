import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GlobalActions} from './global.actions';
import {catchError, exhaustMap, filter, map, of, tap} from 'rxjs';
import {UserRequestService} from '../api/user-request.service';
import {Router} from '@angular/router';
import {AppSettings} from '../app.settings';

@Injectable()
export class GlobalEffects {
  constructor(
    private actions$: Actions,
    private userRequestService: UserRequestService,
    private router: Router,
  ) {}

  tryLogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.submitLogIn),
      filter(({email, password}) => !!email && !!password),
      exhaustMap(({email, password}) =>
        this.userRequestService.logIn({email, password}).pipe(
          map(({token}) => GlobalActions.logInSuccess({token})),
          catchError(() => of(GlobalActions.logInFailure())),
        ),
      ),
    ),
  );

  authTokenSetFunnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.logInSuccess, GlobalActions.loadTokenFromLocalStorage),
      map(({token}) => GlobalActions.setAuthToken({token})),
    ),
  );

  authTokenSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.setAuthToken),
      map(({token}) => {
        if (token) {
          localStorage.setItem(AppSettings.authTokenLocalStorageKey, token);
          return GlobalActions.routeToHome();
        } else {
          localStorage.removeItem(AppSettings.authTokenLocalStorageKey);
          return GlobalActions.routeToLogin();
        }
      }),
    ),
  );

  routeToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GlobalActions.routeToHome),
        tap(() => {
          this.router.navigate(['/a']);
        }),
      ),
    {dispatch: false},
  );

  routeToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GlobalActions.routeToLogin),
        tap(() => {
          this.router.navigate(['/login']);
        }),
      ),
    {dispatch: false},
  );
}
