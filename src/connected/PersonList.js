import PersonList from '../components/PersonList';
import ConnectedPerson from './Person';
import { connect } from 'react-redux';
import { addPerson } from '../state/actions';

const mapStateToProps = ({ people }) => {
  return {
    PersonClass: ConnectedPerson,
    people
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: name => {
      dispatch(addPerson(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);
