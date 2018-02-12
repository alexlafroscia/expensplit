import { combineReducers } from 'redux';
import people from './people';

export const app = combineReducers({
  people
});

export function persistedApp() {
  const state = app(...arguments);

  localStorage.setItem('app-state', JSON.stringify(state));

  return state;
}

export function getPersistedState() {
  const initialState = localStorage.getItem('app-state');

  if (initialState) {
    return JSON.parse(initialState);
  }

  return {
    people: []
  };
}
