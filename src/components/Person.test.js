import React from 'react';
import Person from './Person';
import { ESCAPE_KEY_CODE, RETURN_KEY_CODE } from '../elements/Input';
import { mount } from 'enzyme';

function noop() {}

function simulatKeyPresses(element, value) {
  const characters = [...value];
  let newValue = '';

  for (const char of characters) {
    const keyCode = char.charCodeAt();
    newValue += char;

    element.simulate('keyUp', { keyCode, target: { value: newValue } });
  }
}

test('it displays the name of the person', () => {
  const person = { name: 'Alex' };
  const wrapper = mount(
    <Person person={person} onNameChange={noop} onDeletePerson={noop} />
  );

  expect(wrapper.text()).toContain('Alex');
});

test("it can edit the person's name", () => {
  const person = { name: 'Alex' };
  const onNameChange = jest.fn();
  const wrapper = mount(
    <Person person={person} onNameChange={onNameChange} onDeletePerson={noop} />
  );

  wrapper.find('button').simulate('click');
  const input = wrapper.find('input');

  expect(input.props().defaultValue).toBe('Alex');

  simulatKeyPresses(input, 'Alexander');
  input.simulate('keyUp', { keyCode: RETURN_KEY_CODE });

  expect(onNameChange.mock.calls[0][0]).toBe('Alexander');
});

test("it can cancel editing the person's name", () => {
  const person = { name: 'Alex' };
  const onNameChange = jest.fn();
  const wrapper = mount(
    <Person person={person} onNameChange={onNameChange} onDeletePerson={noop} />
  );

  wrapper.find('button').simulate('click');
  const input = wrapper.find('input');

  expect(input.props().defaultValue).toBe('Alex');

  simulatKeyPresses(input, 'Alexander');
  input.simulate('keyUp', { keyCode: ESCAPE_KEY_CODE });

  expect(wrapper.text()).toContain('Alex');
  expect(wrapper.text()).not.toContain('Alexander');
  expect(onNameChange.mock.calls.length).toBe(0);
});

test('it can invoke the `delete` action for a person', () => {
  const person = { name: 'Alex' };
  const onDeletePerson = jest.fn();
  const wrapper = mount(
    <Person
      person={person}
      onNameChange={noop}
      onDeletePerson={onDeletePerson}
    />
  );

  wrapper.find('button').simulate('click');
  wrapper
    .findWhere(btn => typeof btn.type() === 'string' && btn.text() === 'Delete')
    .simulate('click');

  expect(onDeletePerson.mock.calls.length).toBe(1);
});
