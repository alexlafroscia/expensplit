import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Input from '../elements/Input';

const Header = styled('header')`
  align-items: center;
  display: flex;
`;

const NewPersonButton = styled('button')`
  margin-left: 1em;
`;

const StyledInput = styled(Input)`
  margin-left: 1em;
`;

export function Person({ person }) {
  return <li>{person.name}</li>;
}
Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string
  })
};

export default class PersonList extends Component {
  constructor() {
    super();

    this.state = this._getInitialState();

    this.showNewPersonForm = this.showNewPersonForm.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _getInitialState() {
    return {
      newPersonInputVisible: false,
      newPersonName: ''
    };
  }

  reset() {
    this.setState(() => this._getInitialState());
  }

  showNewPersonForm() {
    this.setState(state =>
      Object.assign({}, state, {
        newPersonInputVisible: true
      })
    );
  }

  handleNameChange(event) {
    event.persist();

    this.setState(state =>
      Object.assign({}, state, {
        newPersonName: event.target.value
      })
    );
  }

  handleSubmit(event) {
    this.props.onAddPerson(event.target.value);
    this.reset();
  }

  render() {
    const { people } = this.props;
    const { newPersonInputVisible, newPersonName } = this.state;

    return (
      <Fragment>
        <Header>
          <h2>People</h2>
          {newPersonInputVisible ? (
            <StyledInput
              type="text"
              value={newPersonName}
              autoFocus
              ref={input => {
                this.nameInput = input;
              }}
              onChange={this.handleNameChange}
              onSubmit={this.handleSubmit}
              onEscape={this.reset}
            />
          ) : (
            <NewPersonButton onClick={this.showNewPersonForm}>
              +
            </NewPersonButton>
          )}
        </Header>
        <ul>
          {people.map(person => <Person key={person.id} person={person} />)}
        </ul>
      </Fragment>
    );
  }
}
PersonList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  onAddPerson: PropTypes.func.isRequired
};
