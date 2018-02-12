export const ADD_PERSON = 'ADD_PERSON';
export const CHANGE_PERSON_NAME = 'CHANGE_PERSON_NAME';
export const REMOVE_PERSON = 'REMOVE_PERSON';

export function addPerson(name) {
  return { type: ADD_PERSON, name };
}

export function changePersonName({ id }, name) {
  return { type: CHANGE_PERSON_NAME, id, name };
}

export function removePerson({ id }) {
  return { type: REMOVE_PERSON, id };
}

function getNextId(people) {
  return people.reduce((acc, { id }) => {
    if (acc > id) {
      return acc;
    }

    return id;
  }, 0);
}

export default function(state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      return [
        ...state,
        {
          id: getNextId(state) + 1,
          name: action.name
        }
      ];
    case CHANGE_PERSON_NAME:
      return state.map(person => {
        if (person.id === action.id) {
          return Object.assign({}, person, { name: action.name });
        }

        return person;
      });
    case REMOVE_PERSON:
      return state.reduce((acc, person) => {
        if (person.id !== action.id) {
          acc.push(person);
        }

        return acc;
      }, []);
    default:
      return state;
  }
}
