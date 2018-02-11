import { ADD_PERSON } from './actions';

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
    default:
      return state;
  }
}
