import React, { Component } from 'react';
import styled from 'react-emotion';
import Scrap from './components/Scrap';
import PersonList from './connected/PersonList';

const Wrapper = styled('div')`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 900px;
  padding-left: 1em;
  padding-right: 1em;
`;

const Header = styled('header')`
  display: flex;
  color: white;
`;

const Title = styled('h1')`
  font-size: 1.2em;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Title>ExpenSplit</Title>
        </Header>
        <Scrap>
          <PersonList />
        </Scrap>
      </Wrapper>
    );
  }
}

export default App;
