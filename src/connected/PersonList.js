import PersonList from '../components/PersonList';
import { connect } from 'react-redux';
import { addPerson } from '../state/actions';

export default connect(
  // First argument maps Redux store to props
  ({ people }) => {
    return {
      people
    };
  },
  // Second argument creates functions to mutate the Redux store
  dispatch => {
    return {
      onAddPerson: name => {
        dispatch(addPerson(name));
      }
    };
  }
)(PersonList);
