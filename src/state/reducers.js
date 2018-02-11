import { ADD_PERSON, CHANGE_PERSON_NAME, REMOVE_PERSON } from './actions';

const initialState = {
  people: [{ id: 1, name: 'Alex' }]
};

function getNextId(people) {
  return people.reduce((acc, { id }) => {
    if (acc > id) {
      return acc;
    }

    return id;
  }, 0);
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case ADD_PERSON:
      return Object.assign({}, state, {
        people: [
          ...state.people,
          {
            id: getNextId(state.people) + 1,
            name: action.name
          }
        ]
      });
    case CHANGE_PERSON_NAME:
      return Object.assign({}, state, {
        people: state.people.map(person => {
          if (person.id === action.id) {
            return Object.assign({}, person, { name: action.name });
          }

          return person;
        })
      });
    case REMOVE_PERSON:
      return Object.assign({}, state, {
        people: state.people.reduce((acc, person) => {
          if (person.id !== action.id) {
            acc.push(person);
          }

          return acc;
        }, [])
      });
    default:
      return state;
  }
}

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
