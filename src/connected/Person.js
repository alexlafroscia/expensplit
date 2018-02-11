import Person from '../components/Person';
import { connect } from 'react-redux';
import { changePersonName, removePerson } from '../state/actions';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch, props) {
  return {
    onNameChange(name) {
      const { person } = props;

      dispatch(changePersonName(person, name));
    },

    onDeletePerson() {
      const { person } = props;

      dispatch(removePerson(person));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
