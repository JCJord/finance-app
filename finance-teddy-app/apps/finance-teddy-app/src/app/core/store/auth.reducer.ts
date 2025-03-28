import { createReducer, on } from '@ngrx/store';
import { setUser, logout } from './auth.action';

export interface AuthState {
  name: string | null;
}

export const initialState: AuthState = {
  name: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { name }) => ({ ...state, name })),
  on(logout, state => ({ ...state, name: null }))
);