import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import BaseInput from '../elements/Input';
import { teal } from '../theme';

const Wrapper = styled('div')`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 1em;
  }
`;

const TextWrapper = styled('span')`
  padding: 3px;
`;

const Input = styled(BaseInput)`
  font-size: 1em;
`;

const ActionWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const TextButton = styled('button')`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${teal};

  &:focus {
    font-weight: bold;
    outline: 0;
  }
`;

const DeleteButton = styled(TextButton)`
  color: red;
`;

export default class Person extends Component {
  constructor() {
    super(...arguments);

    this.state = this._getInitialState();

    this.makeEditable = this.makeEditable.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  _getInitialState() {
    return {
      editing: false,
      temporaryName: this.props.person.name
    };
  }

  makeEditable() {
    this.setState(state =>
      Object.assign({}, state, {
        editing: true
      })
    );
  }

  handleNameChange(event) {
    const { value } = event.target;

    this.setState(state =>
      Object.assign({}, state, {
        temporaryName: value
      })
    );
  }

  handleNameSubmit() {
    const { temporaryName } = this.state;

    this.props.onNameChange(temporaryName);
    this.setState(state =>
      Object.assign({}, state, {
        editing: false
      })
    );
  }

  reset() {
    this.setState(() => this._getInitialState());
  }

  render() {
    const { person } = this.props;
    const { editing, temporaryName } = this.state;

    return (
      <Wrapper>
        {editing ? (
          <Fragment>
            <Input
              value={temporaryName}
              autoFocus
              onChange={this.handleNameChange}
              onSubmit={this.handleNameSubmit}
              onEscape={this.reset}
            />
            <ActionWrapper>
              <DeleteButton onClick={this.props.onDeletePerson}>
                Delete
              </DeleteButton>
              <TextButton onClick={this.reset}>Cancel</TextButton>
            </ActionWrapper>
          </Fragment>
        ) : (
          <Fragment>
            <TextWrapper>{person.name}</TextWrapper>
            <ActionWrapper>
              <TextButton onClick={this.makeEditable}>Edit</TextButton>
            </ActionWrapper>
          </Fragment>
        )}
      </Wrapper>
    );
  }
}
Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string
  }),
  onNameChange: PropTypes.func.isRequired,
  onDeletePerson: PropTypes.func.isRequired
};
