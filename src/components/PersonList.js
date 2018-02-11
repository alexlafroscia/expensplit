import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Person from './Person';
import Input from '../elements/Input';

const Header = styled('header')`
  align-items: center;
  display: flex;
`;

const NewPersonButton = styled('button')`
  margin-left: 1em;
`;

const List = styled('ul')`
  padding-left: 0;
`;

const StyledInput = styled(Input)`
  margin-left: 1em;
`;

const EmptyListText = styled('div')`
  color: grey;
  font-size: 1.2em;
  text-align: center;
`;

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
    const { people, PersonClass = Person } = this.props;
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
        <List>
          {people.length ? (
            people.map(person => (
              <PersonClass key={person.id} person={person} />
            ))
          ) : (
            <EmptyListText>Add a person to get started</EmptyListText>
          )}
        </List>
      </Fragment>
    );
  }
}
PersonList.propTypes = {
  PersonClass: PropTypes.func,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  onAddPerson: PropTypes.func.isRequired
};
