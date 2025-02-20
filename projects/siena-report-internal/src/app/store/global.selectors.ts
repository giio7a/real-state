import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GlobalState} from './global.state';

export const selectGlobal = createFeatureSelector<GlobalState>('global');

export const selectAuthToken = createSelector(selectGlobal, (state) => state.authToken);
