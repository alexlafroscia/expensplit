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
