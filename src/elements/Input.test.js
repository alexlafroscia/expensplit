import React from 'react';
import Input, { RETURN_KEY_CODE, ESCAPE_KEY_CODE } from './Input';
import { shallow } from 'enzyme';

function noop() {}

test('passes the `value` to the input', () => {
  const input = shallow(<Input value="Some value" onChange={noop} />);

  expect(input.find('input').props().defaultValue).toBe('Some value');
});

test('passes the `autoFocus` to the input', () => {
  const input = shallow(<Input value="Some value" onChange={noop} autoFocus />);

  expect(input.find('input').props().autoFocus).toBe(true);
});

test('passes the `classNames` to the input', () => {
  const input = shallow(
    <Input value="Some value" onChange={noop} className="foobar" />
  );

  expect(input.find('input').props().className).toBe('foobar');
});

test('can invoke the `onEscape` callback', () => {
  const onEscape = jest.fn();
  const input = shallow(
    <Input value="Some value" onChange={noop} onEscape={onEscape} />
  );

  input.find('input').simulate('keyup', { keyCode: ESCAPE_KEY_CODE });

  expect(onEscape.mock.calls.length).toBe(1);
});

test('can invoke the `onSubmit` callback', () => {
  const onSubmit = jest.fn();
  const input = shallow(
    <Input value="Some value" onChange={noop} onSubmit={onSubmit} />
  );

  input.find('input').simulate('keyup', { keyCode: RETURN_KEY_CODE });

  expect(onSubmit.mock.calls.length).toBe(1);
});

test('can invoke the `onChange` callback', () => {
  const onChange = jest.fn();
  const input = shallow(<Input value="Some value" onChange={onChange} />);

  input.find('input').simulate('keyup', { keyCode: 65 });

  expect(onChange.mock.calls.length).toBe(1);
});
